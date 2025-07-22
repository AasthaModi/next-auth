import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { redirectIfAuthenticated } from "@/lib/auth";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const API_BASE = "https://jobs-api-g0fe.onrender.com/api/v1";

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://jobs-api-g0fe.onrender.com/api/v1/auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Register</CardTitle>
          <p className="text-gray-500 mt-2">Create your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
            />
            <Input
              name="email"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return redirectIfAuthenticated(context);
};
