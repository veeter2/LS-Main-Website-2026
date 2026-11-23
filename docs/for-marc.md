# For Marc: two lines on /terms to resolve

Found in the 2026-11-19 copy audit. Not edited; these need counsel, not a copywriter.

Both lines describe a rented service. The rest of the site, and the product, is licensed software the company owns. /own-it says, under "Fire us and keep everything":

> Cancel support and the system keeps working. The license doesn't expire, the keys are yours, and the rows are yours.

1. `app/terms/page.tsx`, the license clause: "We grant you a limited, non-exclusive, non-transferable license to use LongStrider according to your service agreement for its duration." "For its duration" means the license ends when the agreement ends. That is a rental, and it contradicts the /own-it line above and /for/finance ("not seats you rent"). The site cannot say both.

2. `app/terms/page.tsx`, the changes clause: "We may modify, suspend, or discontinue features with reasonable notice." This says we can turn off features in software the customer owns. Same contradiction.

Also worth a look while you are in there: /privacy says "Continued use of LongStrider after changes constitutes acceptance of the updated policy." For an installed copy a policy change does not bind the install. Left as is.

Suggested direction: rename the page to license terms, grant a perpetual license to the installed build, and keep "modify, suspend, discontinue" only for the hosted service we run while the customer's build is made.
