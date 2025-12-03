import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAuthenticatedUser } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = async () => {
  const user = await getAuthenticatedUser();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="Welth Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-8">
          {!user && (
            <>
              <a href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600"
              >
                Testimonials
              </a>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
              >
                <Button variant="outline">
                  <LayoutDashboard size={18} />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>
              <Link href="/transaction/create">
                <Button className="flex items-center gap-2">
                  <PenBox size={18} />
                  <span className="hidden md:inline">Add Transaction</span>
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.imageUrl} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form action="/api/auth/logout" method="POST" className="w-full">
                      <button type="submit" className="flex w-full items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
