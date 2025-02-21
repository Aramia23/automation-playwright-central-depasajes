//import { generic_header } from '../selectors/generic';
import { expect, type Locator, type Page } from "@playwright/test";

class Header {
  private header: Locator;

  constructor(page: Page) {
    this.header = page.getByRole("heading", { level: 1 });
  }

  async getSectionTitle() {
    expect(this.header.isVisible());
    await expect(this.header).toHaveText(/Buscá tu pasaje en micro/);
  }
}

export default Header;
