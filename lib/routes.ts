import { BadgeInfo, BriefcaseBusiness, Home, Images, PhoneCall, Sparkles } from "lucide-react"

export const PUBLIC_ROUTES = [
    // pages
    "/",
    "/about",
    "/services",
    "/contact",
    "/portfolio",

    // api routes

];

export const navRoutes = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "About",
    href: "/about",
    icon: BadgeInfo,
  },
  {
    title: "Services",
    href: "/services",
    icon: Sparkles,
  },
  {
    title: "Portfolio",
    href: "/portfolio",
    icon: Images,
  },
  {
    title: "Careers",
    href: "/careers",
    icon: BriefcaseBusiness,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: PhoneCall,
  },
];

export const AUTH_ROUTES = [
    // pages
    "/login", "/register", "/forgot-password", "/reset-password"

    // api routes

];

export const DEFAULT_LOGIN_REDIRECT = "/";

export const protectedRoutes = PUBLIC_ROUTES.filter(
    (route) => !AUTH_ROUTES.includes(route)
);