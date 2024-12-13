import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  Button,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension('purchase.checkout.block.render', () => (
  <Extension />
));

function Extension() {
  return (
    <BlockStack padding={'base'}>
      <Banner title="Save your cart" status="info">
        Good luck with your assignment!
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
      </Banner>
    </BlockStack>
  );
}
