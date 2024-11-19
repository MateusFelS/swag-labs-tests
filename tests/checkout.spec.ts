import { expect, test, Page } from "@playwright/test";

const successCheckoutMessage = "Thank you for your order!";
const errorCheckoutMessage = "Error: First Name is required";

const baseUrl = "https://www.saucedemo.com/";

// Função para adicionar um produto ao carrinho
async function addProductToCart(page: Page, productId = "sauce-labs-backpack") {
    await page.locator(`[id="add-to-cart-${productId}"]`).click();
}
  
// Função para navegar para o carrinho
async function goToCart(page: Page) {
    await page.locator('[data-test="shopping-cart-link"]').click();
}

// Função para iniciar o checkout
async function startCheckout(page: Page) {
    await page.locator('[id="checkout"]').click();
}

// Função para preencher o formulário de informações
async function fillCheckoutForm(page: Page, firstName: string, lastName: string, postalCode: string) {
    await page.locator('[id="first-name"]').fill(firstName);
    await page.locator('[id="last-name"]').fill(lastName);
    await page.locator('[id="postal-code"]').fill(postalCode);
    await page.locator('[id="continue"]').click();
}

// Função de login antes de cada teste
test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator('[id="user-name"]').fill("standard_user");
    await page.locator('[id="password"]').fill("secret_sauce");
    await page.locator('[id="login-button"]').click();
});

test("Realizar um checkout com sucesso", async ({ page }) => {
    await test.step("Adicione um item ao carrinho", async () => {
      await addProductToCart(page);
    });
  
    await test.step("Vá para a página do carrinho", async () => {
      await goToCart(page);
    });
  
    await test.step("Clique em checkout", async () => {
      await startCheckout(page);
    });
  
    await test.step("Complete o formulário Your Information e clique no botão Continue", async () => {
      await fillCheckoutForm(page, "Fulano", "Ciclano", "18870000");
    });
  
    await test.step("Clique no botão Finish", async () => {
      await page.locator('[id="finish"]').click();
    });
  
    await test.step("Uma mensagem 'Thank you for your order!' deve aparecer", async () => {
      expect(page.locator('[data-test="complete-header"]')).toHaveText(successCheckoutMessage);
    });
  });
  
  test("Realizar um checkout com formulário em branco", async ({ page }) => {
    await test.step("Adicione um item ao carrinho", async () => {
      await addProductToCart(page);
    });
  
    await test.step("Vá para a página do carrinho", async () => {
      await goToCart(page);
    });
  
    await test.step("Clique em checkout", async () => {
      await startCheckout(page);
    });
  
    await test.step("Deixe em branco o formulário Your Information e clique no botão Continue", async () => {
      await fillCheckoutForm(page, "", "", "");
    });
  
    await test.step("Uma mensagem 'Error: First Name is required' deve aparecer", async () => {
      expect(page.locator('[data-test="error"]')).toHaveText(errorCheckoutMessage);
    });
  });