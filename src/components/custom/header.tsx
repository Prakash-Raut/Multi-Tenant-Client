import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from "../icons/logo";

const Header = () => {
  return (
    <header>
      <nav className="container mx-auto p-5">
        <Logo />
        <Select>
          <SelectTrigger className="w-[180px] focus:ring-0">
            <SelectValue placeholder="Select Restaurant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cheesy-delight">Cheesy Delight</SelectItem>
            <SelectItem value="pizza-hut">Pizza Hut</SelectItem>
            <SelectItem value="kids-corner">Kids Corner</SelectItem>
          </SelectContent>
        </Select>
      </nav>
    </header>
  );
};

export default Header;
