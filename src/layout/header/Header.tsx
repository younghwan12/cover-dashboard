import Container from "../Container";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import UserMenu from "./UserMenu";

const Header = () => {
    return (
        <>
            <div className="py-4 border-t-[4px] border-[#0072bb]">
                <Container>
                    <div
                        className="
                    flex
                    flex-row
                    items-center
                    gap-3
                    md:gap-0
                "
                    >
                        <Logo />
                        <Navbar />
                    </div>
                    <UserMenu />
                </Container>
            </div>
            <Pagination />
        </>
    );
};
export default Header;
