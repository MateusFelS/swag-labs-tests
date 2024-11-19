import { expect, test, Page } from "@playwright/test";

const baseUrl = "https://www.saucedemo.com/";

// Função para adicionar um produto ao carrinho
async function addProductToCart(page: Page, productId = "sauce-labs-backpack") {
  await page.locator(`[id="add-to-cart-${productId}"]`).click();
}

// Função para navegar para o carrinho
async function goToCart(page: Page) {
  await page.locator('[data-test="shopping-cart-link"]').click();
}

// Função de login antes de cada teste
test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
  await page.locator('[id="user-name"]').fill("standard_user");
  await page.locator('[id="password"]').fill("secret_sauce");
  await page.locator('[id="login-button"]').click();
});

test("Produto adicionado no carrinho com sucesso", async ({ page }) => {
  await test.step("Adicione um item ao carrinho", async () => {
    await addProductToCart(page);
  });

  await test.step("Vá para a página do carrinho", async () => {
    await goToCart(page);
  });

  await test.step("Verifique se o item está no carrinho", async () => {
    expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
  });
});

test("Remover produto do carrinho", async ({ page }) => {
  await test.step("Adicione um item ao carrinho", async () => {
    await addProductToCart(page);
  });

  await test.step("Vá para a página do carrinho", async () => {
    await goToCart(page);
  });

  await test.step("Clique no botão Remove", async () => {
    await page.locator('[id="remove-sauce-labs-backpack"]').click();
  });

  await test.step("Verifique se tem algum item no carrinho", async () => {
    expect(page.locator('[data-test="inventory-item"]')).toBeHidden();
  });
});