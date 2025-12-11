import Button from "@/components/common/Button";

export default function Home() {
  return (
 <div className="col-center mx-auto px-4 max-w-lg min-h-screen gap-3">
  <Button size="full" link href="/login">Login</Button>
  <Button size="full" link href="/register">Register</Button>
 </div>
  );
}
