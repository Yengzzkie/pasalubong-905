"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  useStoreUserData,
  usePostSearchResult,
  useSearchQuery,
} from "@/stores/store";
import axios from "axios";
import Link from "next/link";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AvatarWithUserDropdown from "./AvatarWithUserDropdown";
import Loader from "./ui/Loader";
import Navlogo from "@/public/images/nav-logo.jpeg"

const pages = [
  { text: "Home", link: "/" },
  { text: "Fashion", link: "/" },
  { text: "Electronics", link: "/" },
  { text: "Hobbies", link: "/" },
  { text: "Toys", link: "/" },
  { text: "Appliances", link: "/" },
];

function Navigation() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { searchQuery } = useSearchQuery();
  const { setPostSearchResult } = usePostSearchResult();
  const { userData, setUserData } = useStoreUserData();
  const isLoggedIn = !!session?.user;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Fetch user data when the component mounts or when the session changes
  useEffect(() => {
    async function fetchUserData() {
      try {
        if (!session?.user?.id) return;
        const response = await axios.get(
          `/api/users/user?userId=${session?.user?.id}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [session, isLoggedIn]);

  if (status === "loading") {
    return (
      <div className="sticky top-0 z-50 !bg-[#fff] !text-[var(--color-base-content)]">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              <Loader />
            </Typography>
          </Toolbar>
        </Container>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-50 !bg-[#fff] !text-[var(--color-base-content)]">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "inherit",
              fontWeight: 700,
              letterSpacing: ".05rem",
              color: "var(--color-primary-content)",
            }}
          >
            <Link href="/">
                <img src={Navlogo.src} alt="pasalubong 905 logo" className="w-44" />
              {/* <h2 className="text-center font-bold text-xl text-[var(--color-base-content)]">
                <span className="text-blue-600 text-shadow-lg text-3xl tracking-tighter">
                  Pasalubong
                </span>
                <span className="text-red-500 text-3xl font-bold">
                  905
                </span>
              </h2> */}
            </Link>
          </Typography>

          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {isLoggedIn ? (
                pages.map((page) => (
                  <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                    <Link href={page.link}>
                      <Typography
                        textAlign="center"
                        className="hover:!underline !text-[var(--color-base-content)]"
                      >
                        {page.text}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))
              ) : (
                <div>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/register">
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: "var(--color-primary-content)",
                        }}
                      >
                        Register
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/login">
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: "var(--color-primary-content)",
                        }}
                      >
                        Login
                      </Typography>
                    </Link>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "inherit",
              fontWeight: 700,
              letterSpacing: ".05rem",
              color: "var(--color-primary-content)",
            }}
          >
            <Link href="/">
            <img src={Navlogo.src} alt="pasalubong 905 logo" className="w-44" />
              {/* <h2 className="text-center font-bold text-xl text-[var(--color-base-content)]">
                <span className="text-[var(--color-primary-content)] text-shadow-lg text-3xl tracking-tighter">
                  NadaMart.
                </span>
                <span className="text-[var(--color-primary-content)] text-md font-thin">
                  ca
                </span>
              </h2> */}
            </Link>
          </Typography>

          {/* Desktop Pages */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            {isLoggedIn &&
              pages.map((page) => (
                <Link key={page.text} href={page.link} passHref>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "var(--color-base-content)",
                      display: "block",
                      fontWeight: "400",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {page.text}
                  </Button>
                </Link>
              ))}
          </Box>

          {/* User Avatar or Login/Register Links */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {isLoggedIn ? (
                <div>
                  <AvatarWithUserDropdown userData={userData} />
                </div>
              ) : (
                null
              )}
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </div>
  );
}

export default Navigation;
