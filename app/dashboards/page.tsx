// "use client"
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { LoadingSpinner } from "@/components/ui/loading";
// import { useRouter } from "next/navigation";

// const API_BASE = "https://jobs-api-g0fe.onrender.com/api/v1/jobs"; // External API

// interface User {
//   id: string;
//   email: string;
// }

// export default function Dashboard() {
//   const [user, setUser] = useState<User | null>(null);
//   const [jobs, setJobs] = useState<any[]>([]);
//   const [form, setForm] = useState({
//     position: "",
//     company: "",
//     status: "pending" as "pending" | "interview" | "declined" | "offer",
//     jobType: "full-time" as "full-time" | "part-time" | "contract" | "internship",
//     id: "",
//     isEdit: false,
//   });

//   const [formError, setFormError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     setFetching(true);
//     setFormError(null);
//    try{
//     await axios.get(API_BASE, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     }).then((res) => {
//       setJobs(res.data.jobs || []);
//       setFetching(false);
//       console.log("Fetched jobs:", res.data.jobs);
//     });
//    } catch (err) {
//      console.error("Fetch jobs error:", err);
     
//    } finally {
//      setFetching(false);
//    }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError(null);

//     if (!form.position || !form.company) {
//       setFormError("Position and company are required.");
//       return;
//     }

//     setLoading(true);
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     try {
//       if (form.isEdit) {
//         await axios.patch(`${API_BASE}/${form.id}`, {
//           position: form.position,
//           company: form.company,
//           status: form.status,
//           jobType: form.jobType,
//         }, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setJobs((prev) =>
//           prev.map((job) =>
//             job._id === form.id
//               ? { ...job, position: form.position, company: form.company, status: form.status, jobType: form.jobType }
//               : job
//           )
//         );
//       } else {
//        const res = await axios.post(API_BASE, {
//   position: form.position,
//   company: form.company,
//   status: form.status,
//   jobType: form.jobType,
// }, {
//   headers: { Authorization: `Bearer ${token}` },
// });
//         if(res.data.job) {
//           // Add new job to the list
//           setJobs([res.data.job, ...jobs]);
//           console.log("Job added:", res.data.job);
//       }
//       }

  
//     } catch (err: any) {
//       console.error("Job operation error:", err);
//       if (err.response?.status === 401) {
//         router.push("/login");
//       } else {
//         setFormError("Job operation failed. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (job: any) => {
//     setForm({
//       position: job.position,
//       company: job.company,
//       status: job.status,
//       jobType: job.jobType,
//       id: job._id,
//       isEdit: true,
//     });
//   };

//   const handleDelete = async (id: string) => {
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     try {
//       await axios.delete(`${API_BASE}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setJobs((prev) => prev.filter((job) => job._id !== id));
//     } catch (err) {
//       console.error("Delete failed:", err);
//       setFormError("Delete failed.");
//     }
//     setLoading(false);
//   };

//   const handleLogout = async () => {
//     try {
//       localStorage.removeItem("token");
//       router.push("/login");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//       <div className="max-w-4xl mx-auto p-6 sm:p-10">
//         <header className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Job Tracker</h1>
//             <p className="text-sm text-gray-600">Welcome, {user?.email}</p>
//           </div>
//           <Button variant="outline" onClick={handleLogout}>Logout</Button>
//         </header>

//         <Card className="shadow-xl glass backdrop-blur-md border-white/30 mb-8 animate-fade-in">
//           <CardHeader>
//             <CardTitle>{form.isEdit ? "Edit Job" : "Add New Job"}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <Input
//                 name="position"
//                 placeholder="Position"
//                 value={form.position}
//                 onChange={handleChange}
//                 disabled={loading}
//               />
//               <Input
//                 name="company"
//                 placeholder="Company"
//                 value={form.company}
//                 onChange={handleChange}
//                 disabled={loading}
//               />
//               <select
//                 name="status"
//                 value={form.status}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded bg-white/70 focus:bg-white"
//                 disabled={loading}
//               >
//                 <option value="pending">📋 Pending</option>
//                 <option value="interview">🎯 Interview</option>
//                 <option value="declined">❌ Declined</option>
//                 <option value="offer">🎉 Offer</option>
//               </select>

//               <select
//                 name="jobType"
//                 value={form.jobType}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded bg-white/70 focus:bg-white"
//                 disabled={loading}
//               >
//                 <option value="full-time">💼 Full Time</option>
//                 <option value="part-time">⏰ Part Time</option>
//                 <option value="contract">📝 Contract</option>
//                 <option value="internship">🎓 Internship</option>
//               </select>

//               {formError && (
//                 <Alert variant="destructive" className="animate-slide-up">
//                   <AlertDescription>{formError}</AlertDescription>
//                 </Alert>
//               )}

//               <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
//                 {loading ? <LoadingSpinner size="sm" /> : (form.isEdit ? "Save Changes" : "Add Job")}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <h2 className="text-xl font-semibold mb-4">Your Applications</h2>

//         {fetching ? (
//           <div className="flex justify-center items-center py-8">
//             <LoadingSpinner size="lg" />
//           </div>
//         ) : jobs.length === 0 ? (
//           <p className="text-center text-gray-500">No applications yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
//             {jobs.map((job) => (
//               <Card key={job._id} className="glass backdrop-blur-sm border-white/30 shadow-md hover:shadow-xl transition-transform transform hover:scale-[1.02]">
             
//                 <CardContent>
//                 <h3 className="text-base font-medium ">Position: {job.position}</h3>
//                   <p className="text-base font-medium mb-2">Company: {job.company}</p>
//                   <p className="text-sm mb-1">Status: {job.status} </p>
//                   <p className="text-sm mb-3">Type: {job.jobType}</p>
//                   <div className="flex gap-2">
//                     <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>Edit</Button>
//                     <Button variant="destructive" size="sm" onClick={() => handleDelete(job._id)}>Delete</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
