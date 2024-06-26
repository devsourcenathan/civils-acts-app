import React from "react";

import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import { useLink } from "@refinedev/core";

import { Space, theme, Avatar } from "antd";


const { useToken } = theme;


export const Title: React.FC<RefineLayoutThemedTitleProps> = ({
    collapsed,
    wrapperStyles,
}) => {
    const { token } = useToken();
    const Link = useLink();

    return (
        <Link
            to="/"
            style={{
                display: "inline-block",
                textDecoration: "none",
            }}
        >
            <Space
                style={{
                    // display: "flex",
                    alignItems: "center",
                    fontSize: "inherit",
                    ...wrapperStyles,
                }}
            >
                {collapsed && <div
                    style={{
                        // height: "24px",
                        // width: "24px",
                        color: token.colorPrimary,
                    }}
                >
                    <Avatar

                        style={{
                            backgroundColor: "blue"
                        }}>BC</Avatar>
                    {/* */}
                </div>}

                {!collapsed && (
                    <img
                        style={{
                            height: "120px",
                            width: "150px",
                            color: token.colorPrimary,
                        }}
                        src="/images/banqcare_logo_transparent.png" />
                    // <Typography.Title
                    //     style={{
                    //         fontSize: "24px",
                    //         marginBottom: 0,
                    //         fontWeight: 700,

                    //     }}
                    // >
                    //     {name}
                    // </Typography.Title>
                    // <Logo />
                )}
            </Space>
        </Link>
    );
};
