import { Orders } from '../components/Orders'
import { PageContainer } from '../components/PageContainer'
import { useAuthStore } from '../stores/useAuthStore'

const CompanyOrders = () => {
  return (
    <PageContainer>
      <h1>Company Orders</h1>
      <p>Order details will be displayed here.</p>
      <Orders />
      <p>More information about orders can be added here.</p>
    </PageContainer>
  )
}

export default CompanyOrders
