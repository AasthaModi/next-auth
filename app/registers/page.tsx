// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import Link from "next/link";
// import "@/styles/globals.css";


// export default function RegisterPage() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
//     const res = await fetch("/api/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     setLoading(false);
//     if (res.ok) {
//       router.replace("/login");
//     } else {
//       const data = await res.json();
//       setError(data.error || "Registration failed.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 p-4">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold">Register</CardTitle>
//           <p className="text-gray-500 mt-2">Create your account</p>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               name="name"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={handleChange}
//               disabled={loading}
//             />
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
//               {loading ? "Creating account..." : "Register"}
//             </Button>
//           </form>
//           <div className="mt-4 text-center text-sm">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-600 hover:underline">
//               Login here
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// } 