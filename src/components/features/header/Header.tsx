import Link from "next/link";
import UserCard from "./UserCard";
import Dropdown from "@/components/shared/dropdown/Dropdown";
import { logoutAction } from "@/serverActions/logout";
import ToastEmitter from "@/services/client/ToastEmitter";
import Search from "./Search";
import Breadcrumbs from "./Breadcrumbs";

const Header = () => {
  return (
    <div>
      <div className="p-2 flex justify-between items-center gap-10">
        <Link href="/dashboard" className="group">
          <h1 className="text-primary-text group-hover:text-primary-text/75 transition-colors whitespace-nowrap">
            Git Gud Coder
          </h1>
        </Link>

        <Search className="w-full" inputClassName="h-8 pl-8" />
        <Dropdown
          options={[
            {
              title: "logout",
              onClick() {
                logoutAction();
                ToastEmitter.success("Logged out!");
              },
            },
          ]}
        >
          <UserCard />
        </Dropdown>
      </div>
      <div className="w-full border-b border-b-primary-text"></div>
      <Breadcrumbs className="p-2" />
    </div>
  );
};

export default Header;
