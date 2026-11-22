import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Navbar from "./Navbar";

const getBurger = () => screen.getByRole("button", { name: /menu/i });
const getDrawer = () => document.getElementById("drawer") as HTMLElement;
const desktopNav = () => screen.getAllByRole("navigation", { hidden: true })[0];

const mockMatchMedia = (initialMatches: boolean) => {
  let matches = initialMatches;
  const listeners = new Set<(e: MediaQueryListEvent) => void>();
  window.matchMedia = ((query: string) => ({
    get matches() {
      return matches;
    },
    media: query,
    onchange: null,
    addEventListener: (_: string, cb: any) => listeners.add(cb),
    removeEventListener: (_: string, cb: any) => listeners.delete(cb),
    addListener: (cb: any) => listeners.add(cb),
    removeListener: (cb: any) => listeners.delete(cb),
    dispatchEvent: () => true,
  })) as any;
  return (next: boolean) => {
    matches = next;
    listeners.forEach((cb) => cb({ matches: next } as MediaQueryListEvent));
  };
};

describe("Navbar functional", () => {
  it("shows the logo text Team ALL-IN", () => {
    render(<Navbar />);
    const logo = document.querySelector("header a") as HTMLElement;
    expect(logo).toHaveTextContent(/^Team ALL-IN$/);
    expect(logo).toHaveAttribute("href", "#accueil");
  });

  it("desktop nav has the three links with the right targets", () => {
    render(<Navbar />);
    const nav = within(desktopNav());
    expect(nav.getByRole("link", { name: "Accueil", hidden: true })).toHaveAttribute("href", "#accueil");
    expect(nav.getByRole("link", { name: "Valeurs", hidden: true })).toHaveAttribute("href", "#valeurs");
    expect(nav.getByRole("link", { name: "Contact", hidden: true })).toHaveAttribute(
      "href",
      "mailto:it@teamallin.com",
    );
    expect(nav.getAllByRole("link", { hidden: true })).toHaveLength(3);
  });

  it("drawer has the same three links with the same targets", () => {
    render(<Navbar />);
    const links = within(getDrawer()).getAllByRole("link", { hidden: true });
    expect(links.map((l) => l.getAttribute("href"))).toEqual([
      "#accueil",
      "#valeurs",
      "mailto:it@teamallin.com",
    ]);
  });

  it("drawer links are not exposed to the accessibility tree while closed", () => {
    render(<Navbar />);
    expect(within(getDrawer()).queryAllByRole("link")).toHaveLength(0);
  });

  it("drawer links become accessible once open", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(getBurger());
    expect(within(getDrawer()).getAllByRole("link")).toHaveLength(3);
  });

  it("burger is a button reachable with Tab", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    // logo + 3 desktop links, then the burger
    for (let i = 0; i < 5; i++) await user.tab();
    expect(getBurger()).toHaveFocus();
  });

  it("Enter on the burger opens and closes the drawer", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    getBurger().focus();
    await user.keyboard("{Enter}");
    expect(getBurger()).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Enter}");
    expect(getBurger()).toHaveAttribute("aria-expanded", "false");
  });

  it("Space on the burger opens and closes the drawer", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    getBurger().focus();
    await user.keyboard(" ");
    expect(getBurger()).toHaveAttribute("aria-expanded", "true");
    await user.keyboard(" ");
    expect(getBurger()).toHaveAttribute("aria-expanded", "false");
  });

  it("opens and closes without console errors", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(getBurger());
    await user.keyboard("{Escape}");
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  // BUG 1 (ui-tester): resizing to desktop while the drawer is open leaves it open.
  it("BUG 1: closes the drawer when the viewport grows to desktop width", async () => {
    const user = userEvent.setup();
    const setDesktop = mockMatchMedia(false);
    render(<Navbar />);
    await user.click(getBurger());
    expect(getBurger()).toHaveAttribute("aria-expanded", "true");

    // Tolerant: fire both a matchMedia change and a window resize.
    Object.defineProperty(window, "innerWidth", { value: 1024, configurable: true });
    act(() => {
      setDesktop(true);
      window.dispatchEvent(new Event("resize"));
    });

    expect(getBurger()).toHaveAttribute("aria-expanded", "false");
  });

  // BUG 2 (ui-tester): Escape from a drawer link loses focus to BODY.
  it("BUG 2: returns focus to the burger after Escape from a drawer link", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(getBurger());
    const link = within(getDrawer()).getAllByRole("link")[0];
    link.focus();
    expect(link).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(getBurger()).toHaveAttribute("aria-expanded", "false");
    expect(getBurger()).toHaveFocus();
  });
});
