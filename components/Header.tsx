"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import useCurrentUser from "@/hooks/useCurrentUser"
import { Hamburger, X } from "lucide-react"

const Header = () => {
    const pathname = usePathname()
    const { user, userLoading } = useCurrentUser()
    const [mobileOpen, setMobileOpen] = useState(false)

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Events", path: "/events" },
        { name: "Create Event", path: "/create-event" },
        { name: "About", path: "/about" },
    ]

    const isActive = (path: string) => pathname === path

    return (
        <header className="w-full sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="ConnectUp Logo"
                            width={36}
                            height={36}
                            priority
                            className="bg-accent w-[2.2rem] h-[2.2rem] rounded-full border border-border"
                        />
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                            ConnectUp
                        </span>
                    </Link>
                </motion.div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-4">
                    {navItems.map((item, i) => (
                        <motion.div
                            key={item.path}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Button
                                asChild
                                variant={isActive(item.path) ? "default" : "ghost"}
                                className={`transition-all ${isActive(item.path)
                                    ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white"
                                    : "hover:text-primary"
                                    }`}
                            >
                                <Link href={item.path}>{item.name}</Link>
                            </Button>
                        </motion.div>
                    ))}

                    {/* Auth Buttons */}
                    {!userLoading && (
                        <>
                            {user ? (
                                <Link href="/dashboard">
                                    <Image
                                        src={user.photoURL || "/default-avatar.png"}
                                        alt={user.displayName || "User"}
                                        width={32}
                                        height={32}
                                        className="rounded-full cursor-pointer"
                                    />
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="outline">Log In</Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button variant="default">Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </>
                    )}

                    <ModeToggle />
                </nav>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center">
                    <ModeToggle />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="ml-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Hamburger className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer with overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 bg-background/25 z-40"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 w-64 h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-2xl z-50 p-6 flex flex-col"
                        >
                            <div className="flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`font-medium text-lg ${isActive(item.path)
                                            ? "text-primary"
                                            : "text-gray-700 dark:text-gray-300"
                                            }`}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto flex flex-col gap-2">
                                {!userLoading &&
                                    (user ? (
                                        <Link href="/dashboard">
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={user.photoURL || "/default-avatar.png"}
                                                    alt={user.displayName || "User"}
                                                    width={32}
                                                    height={32}
                                                    className="rounded-full"
                                                />
                                                <span className="text-gray-900 dark:text-gray-100">
                                                    {user.displayName || user.email}
                                                </span>
                                            </div>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href="/login">
                                                <Button variant="outline" className="w-full">
                                                    Log In
                                                </Button>
                                            </Link>
                                            <Link href="/signup">
                                                <Button variant="default" className="w-full">
                                                    Sign Up
                                                </Button>
                                            </Link>
                                        </>
                                    ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </header>
    )
}

export default Header
