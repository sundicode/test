import { errorCodes } from "@/utils/errorCode";
import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/prisma";
import { uploadToS3Bucket } from "@/utils/uploadToS3";
import { checkUserAuth } from "@/libs/checkAuthJwt";
type jwtTokenValue = {
  userId: string;
  matricule: string;
};
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return res.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization");
    const jwtToken = token?.split(" ")[1] as string;
    const { data, status, err } = checkUserAuth(jwtToken);
    if (status) {
      const formdata = await req.formData();

      const medicalReceipt: File | null = formdata.get(
        "medical"
      ) as unknown as File;
      const schoolfeeReceipt: File | null = formdata.get(
        "schoolfee"
      ) as unknown as File;

      const sceduleId = formdata.get("id") as string;

      const exitingDoc = await prisma.schedules.findUnique({
        where: {
          id: sceduleId,
        },
        include: {
          patient: true,
        },
      });
      const user = exitingDoc?.patient.find(
        (user) => user.userId === data?.userId
      );
      if (!sceduleId || sceduleId === null)
        return new res(JSON.stringify({ error: "Please choose a schedule" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      if (!medicalReceipt || !schoolfeeReceipt) {
        return new res(JSON.stringify({ message: "all feilds are required" }), {
          status: errorCodes.badRequest,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      const medicalByte = await medicalReceipt.arrayBuffer();
      const schoolfeeByte = await schoolfeeReceipt.arrayBuffer();

      const schoolfeeBuffer = Buffer.from(schoolfeeByte);
      const medicalsBuffer = Buffer.from(medicalByte);

      // console.log(schoolfeeBuffer, medicalsBuffer);

      const results = await uploadToS3Bucket(
        [medicalsBuffer, schoolfeeBuffer],
        [medicalReceipt.name, schoolfeeReceipt.name]
      );

      if (results.length > 0) {
        const schedule = await prisma.schedules.findUnique({
          where: {
            id: sceduleId,
          },
        });
        const userinfos = await prisma.userinfos.create({
          data: {
            scheduleId: sceduleId,
            medicalReciet: results[0].url,
            schoolfeeReciet: results[1].url,
            userId: data?.userId as string,
          },
        });
        return new res(JSON.stringify({userinfos}), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      } else {
        return new res(
          JSON.stringify({ error: "error occured sending your file" }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }
    } else {
      return new res(JSON.stringify({ err: err }), {
        status: errorCodes.unAuthorized,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  } catch (error: any) {
    return new res(JSON.stringify({ message: error.message }), {
      status: errorCodes.badRequest,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
