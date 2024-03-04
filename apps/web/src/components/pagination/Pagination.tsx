import { currentStorePageAtom } from "@/lib/atoms/storeAtoms";
import { Button, Flex } from "@radix-ui/themes";
import { useAtomValue } from "jotai";

type Props = {
  handleNavigation: (pageNo: number) => void;
  numberOfPages: number;
};

const Pagination = ({ numberOfPages, handleNavigation }: Props) => {
  const currentPage = useAtomValue(currentStorePageAtom);
  const pageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= numberOfPages; i++) {
      buttons.push(
        <Button
          highContrast={currentPage == i}
          key={i}
          onClick={() => handleNavigation(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };
  return (
    <Flex direction="row" justify="center">
      <Flex direction="row" gap="4" justify="center">
        {pageButtons()}
      </Flex>
    </Flex>
  );
};

export default Pagination;
