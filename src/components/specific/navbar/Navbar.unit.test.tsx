import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Navbar from "./Navbar";

const getBurger = () => screen.getByRole("button", { name: /menu/i });
const getDrawer = () => document.getElementById("drawer") as HTMLElement;
const getOverlay = () => document.querySelector(".overlay") as HTMLElement;
const getHeader = () => screen.getByRole("banner");

const scrollTo = (y: number) => {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
};

describe("Navbar unit", () => {
  beforeEach(() => {
    scrollTo(0);
  });

  it("starts closed with the correct aria attributes", () => {
    render(<Navbar />);
    const burger = getBurger();
    expect(burger).toHaveAttribute("aria-label", "Ouvrir le menu");
    expect(burger).toHaveAttribute("aria-expanded", "false");
    expect(burger).toHaveAttribute("aria-controls", "drawer");
    expect(getDrawer()).toHaveAttribute("aria-hidden", "true");
  });

  it("burger toggles the drawer and switches label and aria-expanded", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(getBurger());
    expect(getBurger()).toHaveAttribute("aria-expanded", "true");
    expect(getBurger()).toHaveAttribute("aria-label", "Fermer le menu");
    expect(getDrawer()).toHaveAttribute("aria-hidden", "false");
    expect(getDrawer()).toHaveClass("drawerOpen");
    expect(getOverlay()).toHaveClass("overlayOpen");

    await user.click(getBurger());
    expect(getBurger()).toHaveAttribute("aria-expanded", "false");
    expect(getBurger()).toHaveAttribute("aria-label", "Ouvrir le menu");
    expect(getDrawer()).toHaveAttribute("aria-hidden", "true");
  });

  it("Escape closes the drawer", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(getBurger());
    await user.keyboard("{Escape}");
    expect(getBurger()).toHaveAttribute("aria-expanded", "false");
  });

  it("other keys do not close the drawer", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(getBurger());
    await user.keyboard("a");
    expect(getBurger()).toHaveAttribute("aria-expanded", "true");
  });

  it("overlay click closes the drawer", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(getBurger());
    await user.click(getOverlay());
    expect(getBurger()).toHaveAttribute("aria-expanded", "false");
  });

  it("a drawer link click closes the drawer", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(getBurger());
    const link = Array.from(getDrawer().querySelectorAll("a"))[1];
    link.addEventListener("click", (e) => e.preventDefault());
    await user.click(link);
    expect(getBurger()).toHaveAttribute("aria-expanded", "false");
  });

  it("the burger acts as the X close button when open", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(getBurger());
    expect(getBurger()).toHaveClass("burgerOpen");
    await user.click(screen.getByRole("button", { name: "Fermer le menu" }));
    expect(getBurger()).not.toHaveClass("burgerOpen");
  });

  it("adds the scrolled class past 24px and removes it when back at top", () => {
    render(<Navbar />);
    expect(getHeader()).not.toHaveClass("scrolled");
    scrollTo(10);
    expect(getHeader()).not.toHaveClass("scrolled");
    scrollTo(25);
    expect(getHeader()).toHaveClass("scrolled");
    scrollTo(0);
    expect(getHeader()).not.toHaveClass("scrolled");
  });

  it("is scrolled on mount when the page is already scrolled", () => {
    Object.defineProperty(window, "scrollY", { value: 200, configurable: true });
    render(<Navbar />);
    expect(getHeader()).toHaveClass("scrolled");
  });

  it("removes window listeners on unmount without console errors", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { unmount } = render(<Navbar />);
    unmount();
    fireEvent.keyDown(window, { key: "Escape" });
    scrollTo(100);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
