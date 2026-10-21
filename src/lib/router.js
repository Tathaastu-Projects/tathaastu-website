"use client";

import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams as useNextSearchParams, useParams as useNextParams } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";

const STATE_KEY = "tathaastu_nav_state";

function stashState(state) {
  if (typeof window === "undefined") return;
  try {
    if (state === undefined) sessionStorage.removeItem(STATE_KEY);
    else sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota errors */
  }
}

function readState() {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(STATE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export const Link = forwardRef(function Link({ to, href, ...rest }, ref) {
  return <NextLink ref={ref} href={href ?? to ?? "/"} {...rest} />;
});

export function useLocation() {
  const pathname = usePathname() || "/";
  const [extra, setExtra] = useState({
    search: "",
    hash: "",
    state: undefined,
  });

  useEffect(() => {
    setExtra({
      search: window.location.search || "",
      hash: window.location.hash || "",
      state: readState(),
    });
  }, [pathname]);

  return { pathname, ...extra };
}

export function useNavigate() {
  const router = useRouter();
  return (to, options = {}) => {
    if (typeof to === "number") {
      window.history.go(to);
      return;
    }
    if (options.state !== undefined) stashState(options.state);
    else stashState(undefined);
    if (options.replace) router.replace(to);
    else router.push(to);
  };
}

export function useParams() {
  return useNextParams() || {};
}

export function useSearchParams() {
  const params = useNextSearchParams();
  return [params, () => {}];
}

export function Navigate({ to, replace = false, state }) {
  const router = useRouter();
  useEffect(() => {
    if (state !== undefined) stashState(state);
    if (replace) router.replace(typeof to === "string" ? to : "/");
    else router.push(typeof to === "string" ? to : "/");
  }, [to, replace, router, state]);
  return null;
}
