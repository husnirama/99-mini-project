export function notFoundHandler(req, res) {
    res.status(404).json({ message: `${req.url} does not exist` });
}
//# sourceMappingURL=not-found.middleware.js.map