import { test } from "./fixtures";
import { users, securityKitData } from "./data/userData";

test.describe("Security Kit Flow", () => {
  test.beforeEach(async ({ securityKitPage }) => {
    await securityKitPage.selectPage(users.validUser.pageName);
    await securityKitPage.openPrivacySection();
    await securityKitPage.clearGdprArtifacts();
  });

  test(
    "should add item to Privacy & Compliance section",
    { tag: "@critical" },
    async ({ securityKitPage }) => {
      await securityKitPage.addItem(
        securityKitData.item.url,
        securityKitData.item.name,
      );
      await securityKitPage.expectItemVisible(securityKitData.item.name);
    },
  );
});
