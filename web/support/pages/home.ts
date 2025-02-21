import { type Page } from "@playwright/test";
import Form from "../components/form";

class HomePage {
  readonly page: Page;
  readonly form: Form;

  constructor(page: Page) {
    this.page = page;
    this.form = new Form(page);
  }

  async goto() {
    await this.page.goto("/");
  }
}

export default HomePage;
