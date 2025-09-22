"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./mode-toggle"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const Header = () => {
    const pathname = usePathname()

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Events", path: "/events" },
        { name: "Create Event", path: "/create-event" },
        { name: "About", path: "/about" },
    ]

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

                {/* Navigation */}
                <nav className="hidden md:flex space-x-4">
                    {navItems.map((item, i) => (
                        <motion.div
                            key={item.path}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Button
                                asChild
                                variant={pathname === item.path ? "default" : "ghost"}
                                className={`transition-all ${pathname === item.path
                                    ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white"
                                    : "hover:text-primary"
                                    }`}
                            >
                                <Link href={item.path}>{item.name}</Link>
                            </Button>
                        </motion.div>
                    ))}
                </nav>

                {/* Mode Toggle */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <ModeToggle />
                </motion.div>
            </div>
        </header>
    )
}

export default Header
