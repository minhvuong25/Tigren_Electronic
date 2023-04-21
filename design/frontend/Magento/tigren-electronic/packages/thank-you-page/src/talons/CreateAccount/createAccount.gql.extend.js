module.exports = (targetables, targetablePath) => {
    const createAccountFragment = targetables.reactComponent(targetablePath);
    createAccountFragment
    .insertAfterSource(
        `$is_subscribed: Boolean!`,
        `
        $order_number: String
    `
    )
    .insertAfterSource(
        `is_subscribed: $is_subscribed`,
        `
                order_number: $order_number
            `
    );
};
