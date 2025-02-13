import React from "react";
interface BottomDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    height?: string;
    overlayColor?: string;
    drawerColor?: string;
    closeButton?: React.ReactNode;
    children?: React.ReactNode;
}
declare const BottomDrawer: React.FC<BottomDrawerProps>;
export default BottomDrawer;
//# sourceMappingURL=BottomDrawer.d.ts.map