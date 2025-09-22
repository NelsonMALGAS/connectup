"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { signInWithGitHub } from "@/helpers"
import { showSuccessToast, showErrorToast } from "@/helpers/toastService"
import useCurrentUser from "@/hooks/useCurrentUser"

interface AuthFormProps {
    mode: "login" | "signup"
}


export default function AuthForm({ mode }: AuthFormProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",

    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const { signInWithGoogle, signIn, signUp } = useCurrentUser()

    const validate = () => {
        const newErrors: { [key: string]: string } = {}

        if (mode === "signup" && !formData.fullName.trim()) {
            newErrors.fullName = "Full name is required"
        }

        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        if (mode === "signup" && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        // Update form data
        setFormData({ ...formData, [id]: value });

        // Clear the error for this field
        setErrors(prevErrors => ({ ...prevErrors, [id]: "" }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!validate()) return
            setLoading(true)

            if (mode === "login") {
                await signIn(formData.email, formData.password)
                showSuccessToast("Success", {
                    description: "User logged in successfully",
                    icon: <CheckCircle className="w-6 h-6 mr-2 text-green-500" />,
                })
            } else if (mode === "signup") {
                await signUp(formData.email, formData.password)
                showSuccessToast("Success", {
                    description: "User created successfully",
                    icon: <CheckCircle className="w-6 h-6 mr-2 text-green-500" />,
                })
            }
        } catch (error: unknown) {
            showErrorToast("Failed", {
                description: error instanceof Error ? error.message : "Something went wrong",
                icon: <AlertCircle className="w-5 h-5 mr-2 text-red-500" />,
            })
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleAuth = async () => {
        try {
            await signInWithGoogle()
            showSuccessToast("Success", {
                description: "User signed in successfully",
                icon: <CheckCircle className="w-6 h-6 mr-2 text-green-500" />,
            })

        } catch (error) {
            showErrorToast("Failed", {
                description: error instanceof Error ? error.message : "Something went wrong",
                icon: <AlertCircle className="w-5 h-5 mr-2 text-red-500" />,
            })

        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center min-h-screen"
        >
            <Card className="w-[400px] shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        {mode === "login" ? "Log in to your account" : "Create an account"}
                    </CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {/* OAuth Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                            <Button type="button" onClick={() => signInWithGitHub()} variant="outline" className="flex items-center justify-center">
                                <FaGithub className="mr-2 h-4 w-4" /> GitHub
                            </Button>
                            <Button type="button" onClick={() => handleGoogleAuth()} variant="outline" className="flex items-center justify-center">
                                <FaGoogle className="mr-2 h-4 w-4" /> Google
                            </Button>
                        </div>

                        {/* Separator */}
                        <div className="relative flex items-center">
                            <Separator className="flex-1" />
                            <span className="px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                            <Separator className="flex-1" />
                        </div>

                        {/* Full Name */}
                        {mode === "signup" && (
                            <div className="space-y-1">
                                <Label htmlFor="fullName">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        className="pl-8"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                            </div>
                        )}

                        {/* Email */}
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className="pl-8"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-8"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        {mode === "signup" && (
                            <div className="space-y-1">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-8"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                                )}
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="mt-2">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <span className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : mode === "login" ? (
                                "Log in"
                            ) : (
                                "Create account"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>

    )
}
