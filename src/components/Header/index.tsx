import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SvgIcon from "../SvgIcon";
import MudraPopup from "../Popover";
import MudraTypography from "../Mudra/Typography";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
  background-color: ${({ theme }) => theme.colors.piramalBlue[100]};
`;

export const RowViewCenter = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const UserInfo = styled(UserContainer)`
  gap: 0.5rem;
`;

const Header = () => {
  const router = useRouter();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleLogout = useCallback(() => {
    localStorage.clear();
    router.push("/");
    // window.location.reload();
  }, [router]);

  const userDetails = useMemo(() => {
    const user = JSON.parse(localStorage.getItem("userDetails") || "{}");
    return { name: user?.account?.name };
  }, []);

  return (
    <HeaderContainer>
      <SvgIcon name='headerLogo' width={100} height={32} />
      <UserContainer>
        <UserInfo>
          <UserInfo>
            <Avatar sx={{ width: 24, height: 24 }}>
              <MudraTypography size={10} weight='bold' textColor='piramalBlue100'>
                {userDetails?.name?.charAt(0)}
              </MudraTypography>
            </Avatar>
            <MudraTypography size={14} textColor='piramalBlue10'>
              {userDetails?.name}
            </MudraTypography>
          </UserInfo>
          <div style={{ cursor: "pointer" }}>
            <SvgIcon name='arrowDown' width={20} height={20} alt='arrow' onClick={togglePopup}></SvgIcon>
            <MudraPopup isOpen={isPopupOpen} targetRef={menuRef} onClose={togglePopup}>
              <RowViewCenter onClick={handleLogout}>
                <MudraTypography size={14} weight='bold' textColor='piramalBlue100'>
                  Logout
                </MudraTypography>
              </RowViewCenter>
            </MudraPopup>
          </div>
        </UserInfo>
      </UserContainer>
    </HeaderContainer>
  );
};

export default Header;
