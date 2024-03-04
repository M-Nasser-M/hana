import { Content, Overlay } from "@radix-ui/react-dialog";
import { type ReactNode } from "react";

type Props = { slideFrom: "right" | "left"; children?: ReactNode };
type ChildrenProps = { children: ReactNode };

export const StyledContent = ({ children, slideFrom }: Props) => {
  const directionCss = {
    left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left rtl:inset-y-0 rtl:right-0 rtl:border-l rtl:data-[state=closed]:slide-out-to-right rtl:data-[state=open]:slide-in-from-right",
    right:
      "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right rtl:inset-y-0 rtl:left-0 rtl:border-r rtl:data-[state=closed]:slide-out-to-left rtl:data-[state=open]:slide-in-from-left",
  };
  return (
    <Content
      className={` fixed z-50  p-6 bg-panel-translucent shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out 
      data-[state=closed]:duration-300 data-[state=open]:duration-500 ${directionCss[slideFrom]} sm:max-w-sm `}
    >
      <div>{children}</div>
    </Content>
  );
};

export const StyledOverlay = ({ children }: ChildrenProps) => {
  return (
    <Overlay
      className="fixed inset-0 z-50  backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out 
  data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      {children}
    </Overlay>
  );
};
