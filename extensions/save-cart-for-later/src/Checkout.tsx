import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  Button,
  useCartLines,
  useSessionToken,
  useApi,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension('purchase.checkout.block.render', () => (
  <Extension />
));

function Extension() {
  const cart = useCartLines();
  const token = useSessionToken();
  // console.log(cart);

  const getToken = async () => {
    const token1 = await token.get();
    return token1;
  };
  // console.log(getToken());

const api = useApi()
console.log(api);


  return (
    <BlockStack padding={'base'}>
      <Banner title="Save your cart" status="info">
        <Checkbox onChange={() => console.log('Checked Item 1')}>
          Item 1
        </Checkbox>
        <Checkbox onChange={() => console.log('Checked Item 2')}>
          Item 2
        </Checkbox>
        <Button
          onPress={() => {
            console.log('Save event');
          }}
        >
          Save
        </Button>
        <Button
          onPress={() => {
            console.log('retrieve event');
          }}
        >
          Retrieve latest saved card
        </Button>
      </Banner>
    </BlockStack>
  );
}
