import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@gittrix/common";
import { Response, Request, Router } from "express";
import { Order } from "../models/order";

const router = Router();
router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
