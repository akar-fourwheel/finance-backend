CREATE TABLE IF NOT EXISTS data_feed (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    bank VARCHAR(50) NOT NULL,
    tenure INT NOT NULL,
    on_road_price DECIMAL(12,2) NOT NULL,
    loan_amount DECIMAL(12,2) NOT NULL,
    cashback DECIMAL(12,2),
    cashback_cap DECIMAL(12,2),
    customer_cashback DECIMAL(12,2),
    effective_price DECIMAL(12,2),
    roi DECIMAL(5,2),
    emi_with_roi DECIMAL(12,2),
    total_outgoing DECIMAL(12,2),
    UNIQUE(model, bank, tenure)
);
