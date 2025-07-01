"use client";

import React, { useState, useEffect } from "react";
import { RotateCw, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n/client";

interface Props {
  children: React.ReactNode;
}

const NoInternetWrapper: React.FC<Props> = ({ children }) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);

  const { t } = useTranslation();

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);

    // event listeners to update the state
    window.addEventListener("online", () => {
      setOnline(true);
    });

    window.addEventListener("offline", () => {
      setOnline(false);
    });

    return () => {
      window.removeEventListener("online", () => {
        setOnline(true);
      });
      window.removeEventListener("offline", () => {
        setOnline(false);
      });
    };
  }, []);

  //   if user is online, return the child component else return a custom component
  if (isOnline) {
    return children;
  } else {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
        <WifiOff className="w-16 h-16 text-primary" />
        <h1 className="text-3xl text-black">
          {t("labels.noInternetConnection")}{" "}
        </h1>
        <p className="text-black">{t("labels.pleaseCheckConnection")}</p>
        <Button
          size="sm"
          variant="outline"
          className="w-40 flex items-center gap-2"
          onClick={() => window.location.reload()}
        >
          {t("button.tryAgain")} <RotateCw className="w-4 h-4" />
        </Button>
      </div>
    );
  }
};

export default NoInternetWrapper;
