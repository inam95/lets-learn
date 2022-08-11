import initStripe from 'stripe';

export const getStaticProps = async () => {
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2022-08-01'
  });

  const { data: priceList } = await stripe.prices.list();

  const plans = await Promise.all(
    priceList.map(async (price) => {
      const product = await stripe.products.retrieve(price.product as string);
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        interval: price.recurring?.interval,
        currency: price.currency
      };
    })
  );

  const sortedPlans = plans.sort((a, b) => a.price! - b.price!);

  return {
    props: {
      plans: sortedPlans
    }
  };
};

const Pricing = ({ plans }) => {
  return (
    <div className="flex justify-around w-full max-w-3xl py-16 mx-auto">
      {plans?.map((plan) => (
        <div key={plan.id} className="h-40 px-6 py-3 rounded shadow w-80">
          <h2 className="text-xl">{plan.name}</h2>
          <p className="text-gray-500">
            ${plan.price / 100} / {plan.interval}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Pricing;
