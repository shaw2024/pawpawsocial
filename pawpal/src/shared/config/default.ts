export const config = {
  appName: "PawPal",
  apiUrl: "http://localhost:5000/api",
  defaultProfilePicture: "/images/default-profile.png",
  maxPostLength: 500,
  allowedImageTypes: ["image/jpeg", "image/png", "image/gif"],
  maxImageSize: 5 * 1024 * 1024, // 5 MB
  paginationLimit: 10,
  heroSection: {
    tagline: "Join the community of dog lovers!",
    pawIcons: [
      "/images/paw1.svg",
      "/images/paw2.svg"
    ]
  }
};