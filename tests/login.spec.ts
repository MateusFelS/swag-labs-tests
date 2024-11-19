import { expect, test, Page } from "@playwright/test";

const baseUrl = "https://www.saucedemo.com/";
const invalidErrorMessage = "Epic sadface: Username and password do not match any user in this service";
const emptyErrorMessage = "Epic sadface: Username is required";

// Função para realizar login
async function login(page: Page, username: string, password: string) {
  await page.locator('[id="user-name"]').fill(username);
  await page.locator('[id="password"]').fill(password);
  await page.locator('[id="login-button"]').click();
}

// Função para verificar título da página inicial
async function verifyLoginPage(page: Page) {
  await page.goto(baseUrl);
  expect(await page.title()).toBe("Swag Labs");
}

test("login com sucesso", async ({ page }) => {
  await verifyLoginPage(page);

  await test.step("Preencha os campos com credenciais válidas e clique no botão Login", async () => {
    await login(page, "standard_user", "secret_sauce");
  });

  await test.step("Deve ser acessada a página inicial", async () => {
    expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
  });
});

test("login com falha", async ({ page }) => {
  await verifyLoginPage(page);

  await test.step("Preencha os campos com credenciais inválidas e clique no botão Login", async () => {
    await login(page, "error_user", "error_password");
  });

  await test.step("Uma mensagem de erro deve aparecer", async () => {
    expect(page.locator('[data-test="error"]')).toHaveText(invalidErrorMessage);
  });
});

test("login com campos vazios", async ({ page }) => {
  await verifyLoginPage(page);

  await test.step("Deixe os campos em branco e clique no botão Login", async () => {
    await login(page, "", "");
  });

  await test.step("Uma mensagem de erro deve aparecer", async () => {
    expect(page.locator('[data-test="error"]')).toHaveText(emptyErrorMessage);
  });
});