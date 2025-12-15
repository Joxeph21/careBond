import HttpClient from "@/adapters/http";
import { ThrowError } from "@/utils/config";

// #1 Get User details
export async function AuthUser() {
  try {
    const res = await HttpClient.get<BaseBackendResponse<IUser>>("/auth/user");
    return res.data;
  } catch (err) {
    ThrowError(err);
  }
}
