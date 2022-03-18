const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(function (req, res, next) {
    setTimeout(next, 1000);
});

const customCTParser = bodyParser.json({ type: "application/*+json" });

const getFileData = (file) => {
    const filename = path.join(__dirname, file);
    return JSON.parse(fs.readFileSync(filename, "utf-8"));
};

let orders = getFileData("orders-data.json");

const modifyOrders = (orderIds = [], modifyData = {}) => {
    orders = orders.map((order) => {
        if (orderIds.includes(order.orderId)) {
            return {
                ...order,
                ...modifyData,
            };
        }

        return order;
    });
};

const getOrderById = (orderId) => orders.find((order) => order.orderId === orderId);

app.get("/api/orders", function (req, res) {
    res.json(orders);
});

app.get("/api/orders/:orderId", function (req, res) {
    const { orderId } = req.params;
    const order = getOrderById(orderId);

    if (order) {
        res.json(order);
    } else {
        res.sendStatus(404);
    }
});

app.patch("/api/orders/:orderId", function (req, res) {
    const contentType = req.get("Content-Type");
    const { orderId } = req.params;
    const order = getOrderById(orderId);

    if (!order) {
        res.sendStatus(404);
    }

    if (contentType === "application/vnd.approve-order+json") {
        modifyOrders([orderId], { status: "executed" });

        res.json(getOrderById(orderId));
    } else if (contentType === "application/vnd.reject-order+json") {
        modifyOrders([orderId], { status: "canceled" });

        res.json(getOrderById(orderId));
    } else {
        res.sendStatus(403);
    }
});

app.patch("/api/orders", customCTParser, function (req, res) {
    const contentType = req.get("Content-Type");
    const { orderIds = [] } = req.body;

    console.log(contentType, orderIds);

    if (!orderIds.length) {
        res.sendStatus(403);
    }

    if (contentType === "application/vnd.bulk-approve-order+json") {
        modifyOrders(orderIds, { status: "executed" });

        res.json(orders);
    } else if (contentType === "application/vnd.bulk-reject-order+json") {
        modifyOrders(orderIds, { status: "canceled" });

        res.json(orders);
    } else {
        res.sendStatus(403);
    }
});

app.get("/api/currencies-info", function (req, res) {
    res.json(getFileData("currencies-data.json"));
});

app.listen(3002);
