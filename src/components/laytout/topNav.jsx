import { useEffect } from "react";
import Logo from "../../assets/untityLogo.png";
import { DisplayControler } from "../button/displayControler";
import { MenuIcon } from "../button/menu";
import { ProfileButton } from "../button/profileButton";
import { TabButton } from "../button/tabButton";
import { Container } from "../container/container";

export const TopNav = ({ children, isLocalSemester }) => {
  const page = [
    { path: "/", name: "홈" },
    { path: "/localSemester", name: "현지학기제" },
    { path: "/post", name: "게시판" },
    { path: "/member", name: "맴버" },
  ];
  const navbg = isLocalSemester
    ? "bg-transparent"
    : "border-b bg-white border-b-[#ededed] dark:border-b-[#282828] dark:bg-brand-dark ";

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      console.log(window.scrollY);
      if (window.scrollY > 5) {
        nav.classList.add(
          "bg-white",
          "border-b",
          "border-[#ededed]",
          "dark:border-b-[#282828]",
          "dark:bg-brand-dark"
        );
      } else {
        nav.classList.remove(
          "bg-white",
          "border-b",
          "border-[#ededed]",
          "dark:border-b-[#282828]",
          "dark:bg-brand-dark"
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={"fixed flex items-center w-screen h-16  z-10 " + navbg}>
      <Container>
        <div className="flex justify-between items-center px-2 md:p-0">
          <TabButton to="/" className="w-36  aspect-[10/4] flex items-center">
            <img src={Logo} className="object-cover" alt="logo" />
          </TabButton>
          <div className="flex">
            <div className="w-auto pr-7 gap-1 hidden md:flex">
              {page.map((item, index) => (
                <TabButton key={index} to={item.path}>
                  {item.name}
                </TabButton>
              ))}
            </div>
            <div className="flex items-center gap-4 px-2">
              <ProfileButton />
              <DisplayControler />
              <MenuIcon />
            </div>
          </div>
        </div>
      </Container>
      {children}
    </nav>
  );
};
