import HttpClient from "@/adapters/http";
import { ThrowError } from "@/utils/config";

// #1 Get User details
export async function AuthUser() {
  try {
    const res = await HttpClient.get<BaseBackendResponse<IUser[]>>("/auth/me");

    return res.data.data?.at(0);
  } catch (err) {
    ThrowError(err);
  }
}

export async function getSignedUrl(data: FormData) {
  try {
    const res = await HttpClient.post<
      BaseBackendResponse<
        [
          {
            upload_url: string;
            object_url: string;
            object_name: string;
          },
        ]
      >
    >("/users/profile-image/upload-url/", data);
    return res.data.data?.at(0);
  } catch (err) {
    ThrowError(err);
  }
}

export async function updateUserProfilePicture(data: {
  profile_image_url: string;
}) {
  try {
    const res = await HttpClient.patch<BaseBackendResponse<IUser>>(
      "/users/profile-image/update/",
      data,
    );
    return res.data.data;
  } catch (err) {
    ThrowError(err);
  }
}

// Step 2: Upload the file directly to S3 using the signed URL
export async function uploadFileToS3(uploadUrl: string, file: File) {
  try{

    const res = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    
    if (!res.ok) {
      throw new Error("Failed to upload file to S3");
    }
    
    return res;
  }catch(err){
    ThrowError(err);
  }
}
