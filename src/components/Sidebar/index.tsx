import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import menusList from "./menuList";
import SvgIcon from "../SvgIcon";

const MainMenu = styled.nav`
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-right: 1px solid #e5e5e5;
  position: absolute;
  top: 64px;
  bottom: 0;
  height: calc(100% - 64px);
  left: 0;
  width: 60px;
  overflow: hidden;
  transition: width 0.05s linear;
  transform: translateZ(0) scale(1, 1);
  z-index: 1000;

  &:hover {
    width: 250px;
    overflow: visible;
  }
`;

const ParentUL = styled.ul`
  margin: 7px 0;
  padding: unset;
`;

const ParentLI = styled.li`
  position: relative;
  display: block;
  width: 250px;
  min-height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const StyledDummyLink = styled.div<{ isActive: boolean }>`
  min-height: 44px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s linear;
  &:hover {
    background-color: ${({ theme }) => theme.colors.piramalOrange[10]};
  }
  ${({ isActive, theme }) =>
    isActive &&
    `
    border-left-width: ${"3px"}; 
    border-left-color: ${theme.colors.piramalOrange[80]};
    background-color: ${theme.colors.piramalOrange[10]};
  `}
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
  min-height: 44px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s linear;
  &:hover {
    background-color: ${({ theme }) => theme.colors.piramalOrange[10]};
  }
  ${({ isActive, theme }) =>
    isActive &&
    `
    border-left-width: ${"3px"}; 
    border-left-color: ${theme.colors.piramalOrange[80]};
    background-color: ${theme.colors.piramalOrange[10]};
  `}
`;

const NavIcon = styled(SvgIcon)`
  position: relative;
  width: 60px;
  height: 24px;
  font-size: 18px;
`;

const NavText = styled.div`
  width: 190px;
  position: relative;
  display: flex;
  justify-content: space-between;
  font-family: "NunitoRegular";
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.piramalBlue[100]};
`;

const ChildUl = styled.ul`
  margin: 0;
  max-height: 342px;
  overflow-y: scroll;
  scrollbar-width: none;
  padding: unset;
`;

const ChildLi = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const ChildStyledLink = styled(StyledLink)`
  min-height: 32px;
`;

const ChildNavText = styled(NavText)`
  padding: 0 0 0 60px;
  width: 250px;
`;

const Sidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const pathName = usePathname();
  // const router = useRouter();

  const handleExpand = useCallback((menuPath: string) => {
    setExpandedMenu((prev) => (prev === menuPath ? null : menuPath));
  }, []);

  return (
    <MainMenu>
      <ParentUL onMouseLeave={() => setExpandedMenu(null)}>
        {menusList.map((menu) => (
          <ParentLI key={menu.title}>
            {menu.child && menu.child.length > 0 ? (
              // Render parent text without a link if it has child items
              <StyledDummyLink isActive={pathName.startsWith(menu.path)}>
                <NavIcon name={menu.icon} width={16} height={16} />
                <NavText>
                  {menu.title}
                  {menu.child && menu.child?.length > 0 && (
                    <SvgIcon
                      name='arrowDownDark'
                      width={16}
                      height={16}
                      style={{
                        cursor: "pointer",
                        marginRight: "20px",
                        transform: expandedMenu === menu.path ? "rotate(0deg)" : "rotate(180deg)"
                      }}
                      onClick={() => {
                        handleExpand(menu.path);
                      }}
                    />
                  )}
                </NavText>
              </StyledDummyLink>
            ) : (
              // Render parent link if it doesn't have child items
              <StyledLink href={menu.path} isActive={pathName.startsWith(menu.path)}>
                <NavIcon name={menu.icon} width={16} height={16} />
                <NavText>{menu.title}</NavText>
              </StyledLink>
            )}
            {expandedMenu === menu.path && menu.child && menu.child.length > 0 && (
              <ChildUl>
                {menu.child.map((subMenu, index) => (
                  <ChildLi key={index + 1}>
                    <ChildStyledLink href={subMenu.path} isActive={pathName.startsWith(subMenu.path)}>
                      <ChildNavText>{subMenu.title}</ChildNavText>
                    </ChildStyledLink>
                  </ChildLi>
                ))}
              </ChildUl>
            )}
          </ParentLI>
        ))}
      </ParentUL>
    </MainMenu>
  );
};

export default Sidebar;
