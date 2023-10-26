import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import NewOrder from './Orders/NewOrder';
import AddItems from './Orders/AddItems';
import ListOrders from './Orders/ListOrders';
import ViewOrder from './Orders/ViewOrder';
import Nav from './Nav';
import PendingCount from './Orders/PendingCount';
import Fourpacks from './Orders/Fourpacks';

function App() {
  return (
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/neworder" element={<NewOrder />} />
      <Route path=":id/edit" element={<AddItems />} />
      <Route path="/orders/:date" element={<ListOrders />} />
      <Route path=":id" element={<ViewOrder />} />
      <Route path="/count" element={<PendingCount />} />
      <Route path="/fourpacks" element={<Fourpacks />} />
    </Routes>
    </BrowserRouter>
  )
}
 export default App;
