import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Home from "./Home";

describe("Home integration with Navbar", () => {
  it("renders the navbar and the hero and values sections", () => {
    const { container } = render(<Home />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(container.querySelector("#accueil")).toBeInTheDocument();
    expect(container.querySelector("#valeurs")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Team ALL-IN" })).toBeInTheDocument();
  });

  it("places the navbar above the hero in the DOM", () => {
    const { container } = render(<Home />);
    const header = screen.getByRole("banner");
    const hero = container.querySelector("#accueil") as HTMLElement;
    expect(header.compareDocumentPosition(hero) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("each in-page nav link hash matches an element id on the page", () => {
    const { container } = render(<Home />);
    const nav = within(screen.getAllByRole("navigation", { hidden: true })[0]);
    const hashes = nav
      .getAllByRole("link", { hidden: true })
      .map((l) => l.getAttribute("href") as string)
      .filter((h) => h.startsWith("#"));
    expect(hashes).toEqual(["#accueil", "#valeurs"]);
    hashes.forEach((h) => {
      expect(container.querySelector(h)).toBeInTheDocument();
    });
  });

  it("the Valeurs target contains the three values", () => {
    const { container } = render(<Home />);
    const values = within(container.querySelector("#valeurs") as HTMLElement);
    ["Intensité", "Discipline", "Loyauté"].forEach((v) =>
      expect(values.getByText(v)).toBeInTheDocument(),
    );
  });

  it("opening the drawer inside Home and tapping a link closes it", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const burger = screen.getByRole("button", { name: "Ouvrir le menu" });
    await user.click(burger);
    const drawer = document.getElementById("drawer") as HTMLElement;
    const link = within(drawer).getByRole("link", { name: /Valeurs/ });
    expect(link).toHaveAttribute("href", "#valeurs");
    await user.click(link);
    expect(burger).toHaveAttribute("aria-expanded", "false");
  });

  it("mounts without console errors", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<Home />);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
