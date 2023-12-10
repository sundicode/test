import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/prisma";
import { errorCodes } from "@/utils/errorCode";
import { checkAdminAuth} from "@/libs/checkAuthJwt";
import { uploadToS3Bucket } from "@/utils/uploadToS3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return res.json({}, { headers: corsHeaders });
}
export async function GET(req: NextRequest) {
  try {
    const tips = await prisma.healthTip.findMany({});
    return new res(JSON.stringify({ tips }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.log(error);
    return new res(JSON.stringify({ message: error.message }), {
      status: errorCodes.badRequest,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminToken = req.cookies.get("AdminToken")?.value;
    const tipData = await req.formData();
    const description = tipData.get("description") as string;
    const slug = tipData.get("slug") as string;
    const files: File | null = tipData.get("file") as unknown as File;
    const title = tipData.get("title") as string;

    if (!slug || !title || !description)
      return new res(
        JSON.stringify({ error: "must provide slug ,description, title" }),
        {
          status: errorCodes.badRequest,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    const { status, err, data } = checkAdminAuth(adminToken!);
    if (status) {
      if (data) {
        const adminProfile = await prisma.admins.findUnique({
          where: {
            id: data?.adminId,
          },
        });
        if (files) {
          const fileByte = await files.arrayBuffer();
          const fileBuffer = Buffer.from(fileByte);
          const results = await uploadToS3Bucket([fileBuffer], [files.name]);

          const createdTip = await prisma.healthTip.create({
            data: {
              description: description,
              slug: slug,
              title: title,
              image: results[0].url,
            },
          });
          return new res(
            JSON.stringify({ message: "Tip Created", createdTip }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        } else {
          const createdTip = await prisma.healthTip.create({
            data: {
              description: description,
              slug: slug,
              title: title,
              image: "",
            },
          });
          return new res(
            JSON.stringify({ message: "Tip Created", createdTip }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        }
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
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
