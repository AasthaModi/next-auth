// "use client";
// import { useState } from "react";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import Link from "next/link";
// import "@/styles/globals.css";


// export default function LoginPage() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { data: session } = useSession();

//   if (session) {
//     router.replace("/dashboard");
//     return null;
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
//     const res = await signIn("credentials", {
//       email: form.email,
//       password: form.password,
//       redirect: false,
//     });
//     setLoading(false);
//     if (res?.error) {
//       setError(res.error);
//     } else {
//       router.replace("/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               name="email"
//               placeholder="Email"
//               type="email"
//               value={form.email}
//               onChange={handleChange}
//               disabled={loading}
//             />
//             <Input
//               name="password"
//               placeholder="Password"
//               type="password"
//               value={form.password}
//               onChange={handleChange}
//               disabled={loading}
//             />
//             {error && (
//               <Alert variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </form>
//           <div className="mt-4 text-center text-sm">
//             Don&apos;t have an account?{" "}
//             <Link href="/register" className="text-green-600 hover:underline">
//               Register here
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// } 