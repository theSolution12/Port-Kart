import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface OrderEmailProps {
  address: string;
  items: Array<{
    product: {
      title: string;
      price: number;
    };
    quantity: number;
  }>;
}

export default function OrderEmail({ address, items }: OrderEmailProps) {
  const total = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <Html>
      <Head />
      <Preview>New Order on PortlyCart</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🏴‍☠️ New Order Received!</Heading>
          
          <Section style={section}>
            <Text style={text}>
              Ahoy seller! Ye got a new order from a customer.
            </Text>
          </Section>

          <Section style={section}>
            <Heading style={h2}>📍 Shipping Address</Heading>
            <Text style={text}>{address}</Text>
          </Section>

          <Section style={section}>
            <Heading style={h2}>📦 Order Contents</Heading>
            {items.map((item, index) => (
              <Text key={index} style={itemText}>
                • {item.product.title} × {item.quantity} = ₹{item.quantity * item.product.price}
              </Text>
            ))}
            <Text style={totalText}>
              <strong>Total: ₹{total}</strong>
            </Text>
          </Section>

          <Section style={section}>
            <Text style={text}>
              Get packin' and set sail! 🏴‍☠️
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const section = {
  padding: '24px',
  backgroundColor: '#f6f9fc',
  borderRadius: '8px',
  marginBottom: '16px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
};

const text = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 8px 0',
};

const itemText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '4px 0',
};

const totalText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0 0 0',
  borderTop: '1px solid #ddd',
  paddingTop: '8px',
}; 