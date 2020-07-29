export type DateTime = string;
// https://docs.developer.amazonservices.com/en_UK/easy_ship/EasyShip_Datatypes.html
// TODO: If namespacing for units that are declared differently in different sections is viable, then we should do that
export type Dimensions = {
    // Dimensions is also defined in FBA Inbound.
    Length: number;
    Width: number;
    Height: number;
    Unit: 'cm' | 'inches' | 'centimeters'; // cm in EasyShip, inches and centimeters in FBA Inbound
    Name?: string;
};
export type InvoiceData = {
    InvoiceNumber: string;
    InvoiceDate?: DateTime;
};
declare namespace EasyShip {
    // MerchantFulfillment has a completely different Item definition
    export type Item = {
        OrderItemId: string;
        OrderItemSerialNumberList: string;
    };
}
export type ScheduledPackageId = {
    AmazonOrderId: string;
    PackageId?: string;
};
// TODO: namespacing?
export type Weight = {
    // Weight is also defined in FBA Inbound and in FBA Outbound and in MerchantFulfillment
    Value: number;
    Unit: 'g' | 'pounds' | 'kilograms' | 'KG' | 'LB' | 'grams' | 'ounces'; // 'g' in EasyShip, pounds and kilograms in FBA Inbound, KG and LB in FBA Outbound, 'grams' and 'ounces' in MerchantFulfillment
};
export type PickupSlot = {
    SlotId: string;
    PickupTimeStart?: string;
    PickupTimeEnd?: string;
};
export type Package = {
    ScheduledPackageId: ScheduledPackageId;
    PackageDimensions: Dimensions;
    PackageWeight: Weight;
    PackageItemsList?: Array<EasyShip.Item>;
    PackagePickupSlot: PickupSlot;
    PackageIdentifier?: string;
    Invoice?: InvoiceData;
    PackageStatus?: 'Unscheduled' | 'Scheduled';
};
export type PackageRequestDetails = {
    PackageDimensions?: Dimensions;
    PackageWeight?: Weight;
    PackageItemList?: Array<EasyShip.Item>;
    PackagePickupSlot: PickupSlot;
    PackageIdentifier?: string;
};
export type ScheduledPackageUpdateDetails = {
    ScheduledPackageId: ScheduledPackageId;
    PackagePickupSlot: PickupSlot;
};
// https://docs.developer.amazonservices.com/en_UK/feeds/Feeds_Datatypes.html
export type FeedSubmissionInfo = {
    FeedSubmissionId: string;
    FeedType: string;
    SubmittedDate: DateTime;
    FeedProcessingStatus: string;
    StartedProcessingDate: DateTime;
    CompletedProcessingDate: DateTime;
};
// https://docs.developer.amazonservices.com/en_UK/finances/Finances_Datatypes.html
export type CurrencyAmount = {
    CurrencyCode?: string;
    CurrencyAmount?: number;
};
export type AdjustmentItem = {
    Quantity?: string;
    PerUnitAmount?: CurrencyAmount;
    TotalAmount?: CurrencyAmount;
    SellerSKU?: string;
    FnSKU?: string;
    ProductDescription?: string;
    ASIN?: string;
};
export type AdjustmentEvent = {
    AdjustmentType:
    | 'FBAInventoryReimbursement'
    | 'ReserveEvent'
    | 'PostageBilling'
    | 'PostageRefund'
    | 'LostOrDamagedReimbursement'
    | 'CanceledButPickedUpReimbursement'
    | 'ReimbursementClawback'
    | 'SellerRewards';
    AdjustmentAmount: CurrencyAmount;
    AdjustmentItemList: Array<AdjustmentItem>;
    PostedDate: DateTime;
};
export type AffordabilityExpenseEvent = {
    PostedDate?: DateTime;
    TransactionType?: 'Charge' | 'Refund';
    AmazonOrderId?: string;
    BaseExpense?: CurrencyAmount;
    TotalExpense?: CurrencyAmount;
    /* cSpell: disable */
    TaxTypeIGST?: CurrencyAmount;
    TaxTypeCGST?: CurrencyAmount;
    TaxTypeSGST?: CurrencyAmount;
    /* cSpell: enable */
    MarketplaceId?: string;
};
export type AffordabilityExpenseReversalEvent = AffordabilityExpenseEvent;
export type ChargeComponent = {
    ChargeType?:
    | 'Principal'
    | 'Tax'
    | 'MarketplaceFacilitatorTax-Principal'
    | 'MarketplaceFacilitatorTax-Shipping'
    | 'MarketplaceFacilitatorTax-Giftwrap'
    | 'MarketplaceFacilitatorTax-Other'
    | 'Discount'
    | 'TaxDiscount'
    | 'CODItemCharge'
    | 'CODItemTaxCharge'
    | 'CODOrderCharge'
    | 'CODOrderTaxCharge'
    | 'CODShippingCharge'
    | 'CODShippingTaxCharge'
    | 'ShippingCharge'
    | 'ShippingTax'
    | 'Goodwill'
    | 'Giftwrap'
    | 'GiftwrapTax'
    | 'RestockingFee'
    | 'ReturnShipping'
    | 'PointsFee'
    | 'GenericDeduction'
    | 'FreeReplacementReturnShipping'
    | 'PaymentMethodFee'
    | 'ExportCharge'
    | 'SAFE-TReimbursement'
    /* cSpell: disable */
    | 'TCS-CGST'
    | 'TCS-SGST'
    | 'TCS-IGST'
    | 'TCS-UTGST';
    /* cSpell: enable */
    ChargeAmount?: CurrencyAmount;
};
export type ChargeInstrument = {
    Description?: string;
    Tail?: string;
    Amount?: CurrencyAmount;
};
export type CouponPaymentEvent = {
    PostedDate?: DateTime;
    CouponId?: string;
    SellerCouponDescription?: string;
    ClipOrRedemptionCount?: number;
    PaymentEventId?: string;
    FeeComponent?: FeeComponent;
    ChargeComponent?: ChargeComponent;
    TotalAmount?: CurrencyAmount;
};
export type DebtRecoveryEvent = {
    DebtRecoveryType?: 'DebtPayment' | 'DebtPaymentFailure' | 'DebtAdjustment';
    RecoveryAmount?: CurrencyAmount;
    OverPaymentCredit?: CurrencyAmount;
    DebtRecoveryItemList?: Array<DebtRecoveryItem>;
    ChargeInstrumentList?: Array<ChargeInstrument>;
};
export type DebtRecoveryItem = {
    RecoveryAmount?: CurrencyAmount;
    OriginalAmount?: CurrencyAmount;
    GroupBeginDate?: DateTime;
    GroupEndDate?: DateTime;
};
export type DirectPayment = {
    DirectPaymentType?:
    | 'StoredValueCardRevenue'
    | 'StoredValueCardRefund'
    | 'PrivateLabelCreditCardRevenue'
    | 'PrivateLabelCreditCardRefund'
    | 'CollectOnDeliveryRevenue'
    | 'CollectOnDeliveryRefund';
    DirectPaymentAmount?: CurrencyAmount;
};
export type FBALiquidationEvent = {
    PostedDate?: DateTime;
    OriginalRemovalOrderId?: string;
    LiquidationProceedsAmount?: CurrencyAmount;
    LiquidationFeeAmount?: CurrencyAmount;
};
export type FeeComponent = {
    FeeType?: string; // TODO: https://docs.developer.amazonservices.com/en_UK/finances/Finances_FeeTypes.html lists values
    FeeAmount?: CurrencyAmount;
};
export type FinancialEventGroup = {
    FinancialEventGroupId?: string;
    ProcessingStatus?: 'Open' | 'Closed';
    FundTransferStatus?: string;
    OriginalTotal?: CurrencyAmount;
    ConvertedTotal?: CurrencyAmount;
    FundTransferDate?: DateTime;
    TraceId?: string;
    AccountTail?: string;
    BeginningBalance?: CurrencyAmount;
    FinancialEventGroupStart?: DateTime;
    FinancialEventGroupEnd?: DateTime;
};
export type PerformanceBondRefundEvent = {
    // TODO: This is empty in the documentation!
};
export type FinancialEvents = {
    ShipmentEventList?: Array<ShipmentEvent>;
    RefundEventList?: Array<ShipmentEvent>;
    GuaranteeClaimEventList?: Array<ShipmentEvent>;
    ChargebackEventList?: Array<ShipmentEvent>;
    PayWithAmazonEventList?: Array<PayWithAmazonEvent>;
    ServiceProviderCreditEventList?: Array<SolutionProviderCreditEvent>;
    RetrochargeEventList?: Array<RetrochargeEvent>;
    RentalTransactionEventList?: Array<RentalTransactionEvent>;
    PerformanceBondRefundEventList?: Array<PerformanceBondRefundEvent>;
    ProductAdsPaymentEventList?: Array<ProductAdsPaymentEvent>;
    ServiceFeeEventList?: Array<ServiceFeeEvent>;
    DebtRecoveryEventList?: Array<DebtRecoveryEvent>;
    LoanServicingEventList?: Array<LoanServicingEvent>;
    AdjustmentEventList?: Array<AdjustmentEvent>;
    CouponPaymentEventList?: Array<CouponPaymentEvent>;
    SAFETReimbursementEventList?: Array<SAFETReimbursementEvent>;
    SellerReviewEnrollmentPaymentEventList?: Array<SellerReviewEnrollmentPaymentEvent>;
    FBALiquidationEventList?: Array<FBALiquidationEvent>;
    ImagingServicesFeeEventList?: Array<ImagingServicesFeeEvent>;
    AffordabilityExpenseEventList?: Array<AffordabilityExpenseEvent>;
    AffordabilityExpenseReversalEventList?: Array<AffordabilityExpenseReversalEvent>;
    NetworkComminglingTransactionEventList?: Array<NetworkComminglingTransactionEvent>;
    TDSReimbursementEventList?: Array<TDSReimbursementEvent>;
};
export type ImagingServicesFeeEvent = {
    ImagingRequestBillingItemID?: string;
    ASIN?: string;
    PostedDate?: DateTime;
    FeeList?: Array<FeeComponent>
};
export type LoanServicingEvent = {
    LoanAmount?: CurrencyAmount;
    SourceBusinessEventType?: 'LoanAdvance' | 'LoanPayment' | 'LoanRefund';
};
export type NetworkComminglingTransactionEvent = {
    PostedDate?: DateTime;
    NetCoTransactionID?: string;
    SwapReason?: string;
    TransactionType?: 'NetCo' | 'ComminglingVAT';
    ASIN?: string;
    MarketplaceId?: string;
    TaxExclusiveAmount?: CurrencyAmount;
    TaxAmount?: CurrencyAmount;
};
export type PayWithAmazonEvent = {
    SellerOrderId?: string;
    TransactionPostedDate?: DateTime;
    BusinessObjectType?: 'PaymentContract';
    SalesChannel?: string;
    Charge?: ChargeComponent;
    FeeList?: Array<FeeComponent>;
    PaymentAmountType?: 'Sales';
    AmountDescription?: string;
    FulfillmentChannel?: 'AFN' | 'MFN';
    StoreName?: string;
};
export type ProductAdsPaymentEvent = {
    // TODO: documentation shows these camelCased?! is that for real?
    postedDate?: DateTime;
    transactionType?: 'charge' | 'refund';
    invoiceId?: string;
    baseValue?: CurrencyAmount;
    taxValue?: CurrencyAmount;
    transactionValue?: CurrencyAmount;
};
export type Promotion = {
    PromotionType?: string;
    PromotionId?: string;
    PromotionAmount?: CurrencyAmount;
};
export type RentalTransactionEvent = {
    AmazonOrderId?: string;
    RentalEventType?:
    | 'RentalCustomerPayment-Buyout'
    | 'RentalCustomerPayment-Extension'
    | 'RentalCustomerRefund-Buyout'
    | 'RentalCustomerRefund-Extension'
    | 'RentalHandlingFee'
    | 'RentalChargeFailureReimbursement'
    | 'RentalLostItemReimbursement';
    ExtensionLength?: number;
    PostedDate?: DateTime;
    RentalChargeList?: Array<ChargeComponent>;
    RentalFeeList?: Array<FeeComponent>;
    MarketplaceName?: string;
    RentalInitialValue?: CurrencyAmount;
    RentalReimbursement?: CurrencyAmount;
    RentalTaxWithheldList?: Array<TaxWithheldComponent>;
};
export type RetrochargeEvent = {
    RetrochargeEventType?: 'Retrocharge' | 'RetrochargeReversal';
    AmazonOrderId?: string;
    PostedDate?: DateTime;
    BaseTax?: CurrencyAmount;
    ShippingTax?: CurrencyAmount;
    MarketplaceName?: string;
    RetrochargeTaxWithheldComponentList?: Array<TaxWithheldComponent>;
};
export type SAFETReimbursementEvent = {
    PostedDate?: DateTime;
    SAFETClaimId?: string;
    ReimbursedAmount?: CurrencyAmount;
    SAFETReimbursementItemList?: Array<SAFETReimbursementItem>;
};
export type SAFETReimbursementItem = {
    ItemChargeList?: Array<ChargeComponent>;
};
export type SellerReviewEnrollmentPaymentEvent = {
    PostedDate?: DateTime;
    EnrollmentId?: string;
    ParentASIN?: string;
    FeeComponent?: FeeComponent;
    ChargeComponent?: ChargeComponent;
    TotalAmount?: CurrencyAmount;
};
export type ServiceFeeEvent = {
    AmazonOrderId?: string;
    FeeReason?: string;
    FeeList?: Array<FeeComponent>;
    SellerSKU?: string;
    FnSKU?: string;
    FeeDescription?: string;
    ASIN?: string;
};
export type ShipmentEvent = {
    AmazonOrderId?: string;
    SellerOrderId?: string;
    MarketplaceName?: string;
    OrderChargeList?: Array<ChargeComponent>;
    OrderChargeAdjustmentList?: Array<ChargeComponent>;
    ShipmentFeeList?: Array<FeeComponent>;
    ShipmentFeeAdjustmentList?: Array<FeeComponent>;
    OrderFeeList?: Array<FeeComponent>;
    OrderFeeAdjustmentList?: Array<FeeComponent>;
    DirectPaymentList?: Array<DirectPayment>;
    PostedDate?: DateTime;
    ShipmentItemList?: Array<ShipmentItem>;
    ShipmentItemAdjustmentList?: Array<ShipmentItem>;
};
export type ShipmentItem = {
    SellerSKU?: string;
    OrderItemId?: string;
    OrderAdjustmentItemId?: string;
    QuantityShipped?: number;
    ItemChargeList?: Array<ChargeComponent>;
    ItemTaxWithheldList?: Array<TaxWithheldComponent>;
    ItemChargeAdjustmentList?: Array<ChargeComponent>;
    ItemFeeList?: Array<FeeComponent>;
    ItemFeeAdjustmentList?: Array<FeeComponent>;
    PromotionList?: Array<Promotion>;
    PromotionAdjustmentList?: Array<Promotion>;
    CostOfPointsGenerated?: CurrencyAmount;
    CostOfPointsReturned?: CurrencyAmount;
};
export type SolutionProviderCreditEvent = {
    ProviderTransactionType?: 'ProviderCredit' | 'ProviderCreditReversal';
    SellerOrderId?: string;
    MarketplaceId?: string;
    MarketplaceCountryCode?: string;
    SellerId?: string;
    SellerStoreName?: string;
    ProviderId?: string;
    ProviderStoreName?: string;
};
export type TDSReimbursementEvent = {
    PostedDate?: DateTime;
    TdsOrderId?: string;
    ReimbursedAmount?: CurrencyAmount;
};
export type TaxWithheldComponent = {
    TaxCollectionModel?: 'MarketplaceFacilitator' | 'Standard';
    TaxesWithheld?: Array<ChargeComponent>;
};

// https://docs.developer.amazonservices.com/en_UK/fba_inbound/FBAInbound_Datatypes.html
declare namespace Inbound {
    // Inbound and Outbound have different names for their Address object fields, so let's try namespacing them to see if that helps any confusion.
    export type Address = {
        Name: string; // max 50 char
        AddressLine1: string; // max 180 char
        AddressLine2?: string; // max 60 char
        City: string; // max 30 char
        DistrictOrCounty?: string; // max 25 char
        StateOrProvinceCode?: string; // max 2 char
        CountryCode: string; // max 2 char, ISO-3166-1 alpha-2
        PostalCode?: string; // max 30 char
    };
}
export type PrepInstruction = 'Polybagging' | 'BubbleWrapping' | 'Taping' | 'BlackShrinkWrapping' | 'Labeling' | 'HangGarment';
export type Amount = {
    CurrencyCode: 'USD' | 'GBP';
    Value: string;
};
export type AmazonPrepFeesDetails = {
    PrepInstruction: PrepInstruction;
    FeePerUnit: Amount;
};
export type InboundGuidance = 'InboundNotRecommended' | 'InboundOK';
export type GuidanceReason = 'SlowMovingASIN' | 'NoApplicableGuidance';
export type ASINInboundGuidance = {
    ASIN: string;
    InboundGuidance: InboundGuidance;
    GuidanceReasonList?: Array<GuidanceReason>;
};
export type ASINPrepInstructions = {
    // TODO: documentation does not have a "Required" field as most do
    ASIN: string;
    BarcodeInstruction?: 'RequiresFNSKULabel' | 'MustProvideSellerSKU';
    PrepGuidance: 'ConsultHelpDocuments' | 'NoAdditionalPrepRequired' | 'SeePrepInstructionsList';
    PrepInstructionList?: Array<PrepInstruction>;
};
export type BoxContentsFeeDetails = {
    TotalUnits?: number;
    FeePerUnit?: Amount;
    TotalFee?: Amount;
};
export type BoxContentsSource = 'NONE' | 'FEED' | '2D_BARCODE' | 'INTERACTIVE';
export type Contact = {
    Name: string; // 50 char
    Phone: string; // 20 char
    Email: string; // 50 char
    Fax: string; // 20 char
};
export type InboundShipmentHeader = {
    ShipmentName: string;
    ShipFromAddress: Inbound.Address;
    DestinationFulfillmentCenterId: string;
    LabelPrepPreference: 'SELLER_LABEL' | 'AMAZON_LABEL_ONLY' | 'AMAZON_LABEL_PREFERRED';
    AreCasesRequired?: boolean; // TODO: should this be a string true | false ?
    ShipmentStatus: 'WORKING' | 'SHIPPED' | 'CANCELLED';
    IntendedBoxContentsSource?: BoxContentsSource;
};
export type InboundShipmentInfo = {
    ShipmentId?: string;
    ShipmentName?: string;
    ShipFromAddress: Inbound.Address;
    DestinationFulfillmentCenterId?: string;
    LabelPrepType?: 'NO_LABEL' | 'SELLER_LABEL' | 'AMAZON_LABEL';
    ShipmentStatus?: 'WORKING' | 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'CHECKED_IN' | 'RECEIVING' | 'CLOSED' | 'CANCELLED' | 'DELETED' | 'ERROR';
    AreCasesRequired: boolean; // TODO: should this be a string true | false ?
    ConfirmedNeedByDate?: string; // YYYY-MM-DD, only valid in India and Japan
    BoxContentsSource?: BoxContentsSource;
    EstimatedBoxContentsFee?: BoxContentsFeeDetails;
};
export type InboundShipmentItem = {
    ShipmentId?: string;
    SellerSKU: string;
    FulfillmentNetworkSKU?: string;
    QuantityShipped: number;
    QuantityReceived?: number;
    QuantityInCase?: number;
    PrepDetailsList?: Array<PrepDetails>;
    ReleaseDate?: string // YYYY-MM-DD
};
export type InboundShipmentPlan = {
    ShipmentId: string;
    DestinationFulfillmentCenterId: string;
    ShipToAddress: Inbound.Address;
    LabelPrepType: 'NO_LABEL' | 'SELLER_LABEL' | 'AMAZON_LABEL'; // TODO: this sequence is used in multiple places, combine them into a single type
    Items: InboundShipmentPlanItem;
    EstimatedBoxContentsFee?: BoxContentsFeeDetails;
};
export type InboundShipmentPlanItem = {
    SellerSKU: string;
    FulfillmentNetworkSKU: string;
    Quantity: number;
    PrepDetailsList?: Array<PrepDetails>;
};
type ItemConditions =
| 'NewItem'
| 'NewWithWarranty'
| 'NewOEM'
| 'NewOpenBox'
| 'UsedLikeNew'
| 'UsedVeryGood'
| 'UsedGood'
| 'UsedAcceptable'
| 'UsedPoor'
| 'UsedRefurbished'
| 'CollectibleLikeNew'
| 'CollectibleVeryGood'
| 'CollectibleGood'
| 'CollectibleAcceptable'
| 'CollectiblePoor'
| 'RefurbishedWithWarranty'
| 'Refurbished'
| 'Club';

export type InboundShipmentPlanRequestItem = {
    SellerSKU: string;
    ASIN?: string;
    Condition?: ItemConditions;
    Quantity: number;
    QuantityInCase?: number;
    PrepDetailsList?: Array<PrepDetails>;
};
export type InvalidASIN = {
    ASIN: string;
    ErrorReason: 'DoestNotExist';
};
export type InvalidSKU = {
    SellerSKU: string;
    ErrorReason: 'DoesNotExist';
};
type NonPartneredCarriers =
// UK
| 'BUSINESS_POST'
| 'DHL_AIRWAYS_INC'
| 'DHL_UK'
| 'PARCELFORCE'
| 'DPD'
| 'TNT_LOGISTICS_CORPORATION'
| 'TNT'
| 'YODEL'
| 'UNITED_PARCEL_SERVICE_INC' // UK & US
| 'OTHER' // UK & US
// US
| 'DHL_EXPRESS_USA_INC'
| 'FEDERAL_EXPRESS_CORP'
| 'UNITED_STATES_POSTAL_SERVICE';

export type NonPartneredLtlDataInput = {
    CarrierName: NonPartneredCarriers;
};
export type NonPartneredLtlDataOutput = NonPartneredLtlDataInput;
export type NonPartneredSmallParcelDataInput = {
    CarrierName: NonPartneredCarriers;
    PackageList: Array<NonPartneredSmallParcelPackageInput>;
};
export type NonPartneredSmallParcelDataOutput = {
    PackageList: Array<NonPartneredSmallParcelPackageOutput>;
};
export type NonPartneredSmallParcelPackageInput = {
    TrackingId: string; // 30
};
export type NonPartneredSmallParcelPackageOutput = {
    CarrierName: NonPartneredCarriers;

    TrackingId: string; // 30
    PackageStatus: 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'CHECKED_IN' | 'RECEIVING' | 'CLOSED';
};
export type Pallet = {
    Dimensions: Dimensions;
    Weight?: Weight;
    IsStacked: boolean; // TODO: should this be a string true | false
};
export type PartneredEstimate = {
    Amount?: Amount;
    ConfirmDeadline?: DateTime;
    VoidDeadline?: DateTime;
};
type FreightClass = '50' | '55' | '60' | '65' | '70' | '77.5' | '85' | '92.5' | '100' | '110' | '125' | '150' | '175' | '200' | '250' | '300' | '400' | '500';
export interface PartneredLtlDataInput {
    Contact: Contact;
    BoxCount: number;
    SellerFreightClass?: FreightClass;
    FreightReadyDate: string; // YYYY-MM-DD
    PalletList?: Array<Pallet>;
    TotalWeight?: Weight;
    SellerDeclaredValue?: Amount;
}
export interface PartneredLtlDataOutput extends PartneredLtlDataInput {
    AmazonCalculatedValue?: Amount;
    PreviewPickupDate: DateTime;
    PreviewDeliveryDate: DateTime;
    PreviewFreightClass: FreightClass;
    AmazonReferenceId: string;
    IsBillOfLadingAvailable: boolean; // TODO: should this be a string true | false
    PartneredEstimate: PartneredEstimate;
    CarrierName: // US carriers only?
    | 'DHL_EXPRESS_USA_INC'
    | 'FEDERAL_EXPRESS_CORP'
    | 'UNITED_STATES_POSTAL_SERVICE'
    | 'UNITED_PARCEL_SERVICE_INC'
    | 'OTHER';
}
export type PartneredSmallParcelDataInput = {
    CarrierName?:
    | 'UNITED_PARCEL_SERVICE_INC' // FR, IT, ES, UK, US, DE
    | 'DHL_STANDARD'; // DE
    PackageList: Array<PartneredSmallParcelPackageInput>;
};
export type PartneredSmallParcelDataOutput = {
    PackageList: Array<PartneredSmallParcelPackageOutput>;
    PartneredEstimate?: PartneredEstimate;
};
export type PartneredSmallParcelPackageInput = {
    Dimensions: Dimensions;
    Weight: Weight;
};
export type PartneredSmallParcelPackageOutput = {
    Dimensions: Dimensions;
    Weight: Weight;
    TrackingId: string; // 30
    PackageStatus: 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'CHECKED_IN' | 'RECEIVING' | 'CLOSED';
    CarrierName: string;
};
export type PrepDetails = {
    PrepInstruction: PrepInstruction;
    PrepOwner: 'AMAZON' | 'SELLER';
};
export type SKUInboundGuidance = {
    SellerSKU: string;
    ASIN: string;
    InboundGuidance: InboundGuidance;
    GuidanceReasonList?: Array<GuidanceReason>;
};
export type SKUPrepInstructions = {
    // TODO: this one does not have an optional field in docs
    SellerSKU: string;
    ASIN: string;
    BarcodeInstruction: 'RequiresFNSKULabel' | 'CanUseOriginalBarcode';
    PrepGuidance: 'ConsultHelpDocuments' |'NoAdditionalPrepRequired' | 'SeePrepInstructionsList';
    PrepInstructionList?: Array<PrepInstruction>;
    AmazonPrepFeesDetails: Array<AmazonPrepFeesDetails>;
};
export type TransportContent = {
    TransportHeader: TransportHeader;
    TransportDetails: TransportDetailOutput;
    TransportResult: TransportResult;
};
export type TransportDetailInput = {
    PartneredSmallParcelData?: PartneredSmallParcelDataInput;
    NonPartneredSmallParcelData?: NonPartneredSmallParcelDataInput;
    PartneredLtlData?: PartneredLtlDataInput;
    NonPartneredLtlData?: NonPartneredLtlDataInput;
};
export type TransportDetailOutput = {
    PartneredSmallParcelData?: PartneredSmallParcelDataOutput;
    NonPartneredSmallParcelData?: NonPartneredSmallParcelDataOutput;
    PartneredLtlData?: PartneredLtlDataOutput;
    NonPartneredLtlData?: NonPartneredLtlDataOutput;
};
export type TransportDocument = {
    PdfDocument: string;
    Checksum: string;
};
export type TransportHeader = {
    SellerId: string;
    ShipmentId: string;
    IsPartnered: boolean; // TODO: true | false ?
    ShipmentType: 'SP' | 'LTL';
};
export type TransportResult = {
    TransportStatus:
    | 'WORKING'
    | 'ERROR_ON_ESTIMATING'
    | 'ESTIMATING'
    | 'ESTIMATED'
    | 'ERROR_ON_CONFIRMING'
    | 'CONFIRMING'
    | 'CONFIRMED'
    | 'VOIDING'
    | 'VOIDED'
    | 'ERROR_IN_VOIDING';
};

// https://docs.developer.amazonservices.com/en_UK/fba_inventory/FBAInventory_Datatypes.html

export type InventorySupply = {
    SellerSKU?: string;
    FNSKU: string;
    ASIN?: string;
    Condition?: ItemConditions;
    TotalSupplyQuantity: number;
    InStockSupplyQuantity: number;
    EarliestAvailability?: Timepoint;
    SupplyDetail?: Array<InventorySupplyDetail>;
};
export type InventorySupplyDetail = {
    Quantity: number;
    SupplyType: 'InStock' | 'Inbound' | 'Transfer';
    EarliestAvailableToPick: Timepoint;
    LatestAvailableToPick: Timepoint;
};
export type Timepoint = {
    TimepointType: 'Immediately' | 'DateTime' | 'Unknown';
    DateTime?: DateTime;
};


// https://docs.developer.amazonservices.com/en_UK/fba_outbound/FBAOutbound_Datatypes.html

declare namespace Outbound {
    export type Address = {
        Name: string; // 50
        Line1: string; // 60
        Line2?: string; // 60
        Line3?: string; // 60
        DistrictOrCounty?: string; // 150
        City?: string; // 50 "required except in JP, do not use in JP"
        StateOrProvinceCode: string; // 150
        CountryCode: string; // 2
        PostalCode?: string; // 20
        PhoneNumber?: string; // 20
    };
}

export type CODSettings = {
    IsCODRequired?: boolean; // true | false ?
    CODCharge?: Currency;
    CODChargeTax?: Currency;
    ShippingCharge?: Currency;
    ShippingChargeTax?: Currency;
};
export interface CreateFulfillmentOrderItem {
    SellerSKU: string; // 50
    SellerFulfillmentOrderItemId: string; // 50
    Quantity: number;
    GiftMessage?: string; // 512
    DisplayableComment?: string; // 250
    FulfillmentNetworkSKU?: string;
    PerUnitDeclaredValue?: Currency;
    PerUnitPrice?: Currency;
    PerUnitTax?: Currency;
}
export type CreateReturnItem = {
    SellerReturnItemId: string; // 80
    SellerFulfillmentOrderItemId: string;
    AmazonShipmentId: string;
    ReturnReasonCode: string;
    ReturnComment?: string; // 1000
};
export type Currency = {
    CurrencyCode: string; // 3
    Value: string;
};
export type DeliveryWindow = {
    StartDateTime: DateTime;
    EndDateTime: DateTime;
};
export type Fee = {
    Name: 'FBAPerUnitFulfillmentFee' | 'FBAPerOrderFulfillmentFee' | 'FBATransportationFee' | 'FBAFulfillmentCODFee';
    Amount: Currency;
};
type ShippingSpeedCategory = 'Standard' | 'Expedited' | 'Priority' | 'ScheduledDelivery';
export type FulfillmentOrder = {
    SellerFulfillmentOrderId: string;
    MarketplaceId: string; // TODO: might be able to fill this with valid values
    DisplayableOrderId: string;
    DisplayableOrderDateTime: DateTime;
    DisplayableOrderComment: string;
    ShippingSpeedCategory: ShippingSpeedCategory;
    DeliveryWindow: DeliveryWindow;
    DestinationAddress: Outbound.Address;
    FulfillmentAction?: 'Ship' | 'Hold';
    FulfillmentPolicy?: 'FillOrKill' | 'FillAll' | 'FillAllAvailable';
    ReceivedDateTime: DateTime;
    FulfillmentOrderStatus: 'RECEIVED' | 'INVALID' | 'PLANNING' | 'PROCESSING' | 'CANCELLED' | 'COMPLETE' | 'COMPLETE_PARTIALLED' | 'UNFULFILLABLE';
    StatusUpdatedDateTime: DateTime;
    NotificationEmailList?: string;
    CODSettings?: CODSettings;
};
export interface FulfillmentOrderItem extends CreateFulfillmentOrderItem {
    CancelledQuantity: number;
    UnfulfillableQuantity: number;
    EstimatedShipDateTime?: DateTime;
    EstimatedArrivalDateTime?: DateTime;
}
export type FulfillmentPreview = {
    ShippingSpeedCategory: ShippingSpeedCategory;
    IsFulfillable: boolean; // true | false ?
    IsCODCapable: boolean; // true | false ? // TODO: this says "only available in JP" so it might need to be optional? not sure
    MarketplaceId: string;
    EstimatedShippingWeight?: Weight;
    EstimatedFees?: Array<Fee>;
    FulfillmentPreviewShipments?: Array<FulfillmentPreviewShipment>;
    UnfulfillablePreviewItems?: Array<UnfulfillablePreviewItems>;
    OrderUnfulfillableReasons?: Array<'DeliverySLAUnavailable' | 'InvalidDestinationAddress'>; // TODO: There may be other error codes, those are listed as "examples" not "valid values"
    ScheduledDeliveryInfo?: ScheduledDeliveryInfo;
};
export type FulfillmentPreviewItem = {
    SellerSKU: string;
    SellerFulfillmentOrderItemId: string;
    Quantity: number;
    EstimatedShippingWeight?: Weight;
    ShippingWeightCalculationMethod?: 'Package' | 'Dimensional';
};
export type FulfillmentPreviewShipment = {
    EarliestShipDate: DateTime;
    LatestShipDate: DateTime;
    EarliestArrivalDate: DateTime;
    LatestArrivalDate: DateTime;
    FulfillmentPreviewItems: Array<FulfillmentPreviewItem>;
};
export type FulfillmentShipment = {
    AmazonShipmentId: string;
    FulfillmentCenterId: string;
    FulfillmentShipmentStatus: 'PENDING' | 'SHIPPED' | 'CANCELLED_BY_FULFILLER' | 'CANCELLED_BY_SELLER';
    ShippingDateTime?: DateTime;
    EstimatedArrivalDateTime?: DateTime;
    FulfillmentShipmentItem: Array<FulfillmentShipmentItem>;
    FulfillmentShipmentPackage: Array<FulfillmentShipmentPackage>;
};
export type FulfillmentShipmentItem = {
    SellerSKU?: string;
    SellerFulfillmentOrderItemId: string;
    Quantity: number;
    PackageNumber?: number;
};
export type FulfillmentShipmentPackage = {
    PackageNumber: number;
    CarrierCode: string;
    TrackingNumber?: string;
    EstimatedArrivalDateTime?: DateTime;
};
export type GetFulfillmentPreviewItem = {
    SellerSKU: string;
    SellerFulfillmentOrderItemId: string;
    Quantity: number;
};
export type InvalidItemReasonCode = 'InvalidValues' | 'DuplicateRequest' | 'NoCompletedShipItems' | 'NoReturnableQuantity';
export type InvalidItemReason = {
    InvalidItemReasonCode: InvalidItemReasonCode;
    Description: string;
};
export type InvalidReturnItem = {
    SellerReturnItemId: string;
    SellerFulfillmentOrderItemId: string;
    InvalidItemReason: InvalidItemReason;
};
export type ReasonCodeDetails = {
    ReturnReasonCode: string;
    Description: string;
    TranslatedDescription?: string;
};
export type ReturnAuthorization = {
    ReturnAuthorizationId: string;
    FulfillmentCenterId: string;
    ReturnToAddress: PaymentAddress;
    AmazonRmaId: string;
    RmaPageURL: string;
};
export type ReturnItem = {
    SellerReturnItemId: string;
    SellerFulfillmentOrderItemId: string;
    AmazonShipmentId: string;
    SellerReturnReasonCode: string;
    ReturnComment?: string;
    AmazonReturnReasonCode?: string;
    Status: Status;
    StatusChangedDate: DateTime;
    ReturnAuthorizationId?: string;
    ReturnReceivedCondition?: ReturnReceivedCondition;
    FulfillmentCenterId?: string;
};
export type ReturnReceivedCondition = 'CarrierDamaged' | 'CustomerDamaged' | 'Defective' | 'FulfillerDamaged' | 'Sellable';
export type ScheduledDeliveryInfo = {
    DeliveryTimeZone: string;
    DeliveryWindows: Array<DeliveryWindow>;
};
export type Status = 'New' | 'Processed';
export type TrackingAddress = {
    City: string;
    State: string;
    Country: string;
};
export type TrackingEvent = {
    EventDate: string;
    EventAddress: TrackingAddress;
    EventCode: string; // TODO: This is a disgustingly long list of strings that are "EVENT_###" where ### is a number from 101 to 419, and the only explanation is in the doc page.
};
export type UnfulfillablePreviewItem = {
    SellerSKU: string;
    SellerFulfillmentOrderItemId: string;
    Quantity: number;
    ItemUnfulfillableReasons?: 'InventoryUnavailable' | 'NoDeliveryOption'; // TODO: there may be more here but that's documented as "examples" not valid values.
};
export type UpdateFulfillmentOrderItem = Omit<CreateFulfillmentOrderItem, 'SellerSKU' | 'FulfillmentNetworkSKU'>;

// https://docs.developer.amazonservices.com/en_UK/merch_fulfill/MerchFulfill_Datatypes.html

export type AdditionalInputs = {
    AdditionalInputFieldName: string; // examples NON_DELIVERABLE_INSTRUCTIONS, SENDER_ADDRESS_TRANSLATED
    SellerInputDefinition: SellerInputDefinition;
};
declare namespace MerchantFulfillment {
    export type Address = {
        Name: string;
        AddressLine1: string;
        AddressLine2?: string;
        AddressLine3?: string;
        DistrictOrCounty?: string;
        Email: string;
        City: string;
        StateOrProvinceCode?: string;
        PostalCode: string;
        CountryCode: string;
        Phone: string;
    };
    export type Item = {
        OrderItemId: string;
        Quantity: number;
        ItemWeight?: Weight;
        ItemDescription?: string;
        TransparencyCodeList?: TransparencyCodeList;
        ItemLevelSellerInputsList?: ItemLevelSellerInputsList;
    };
}
export type FileContents = {
    Contents: string;
    FileType: 'application/pdf' | 'application/zpl' | 'image/png';
    Checksum: string;
};
export type HazmatType = 'None' | 'LQHazmat';
export type ItemLevelFieldsList = {
    Asin: string;
    AdditionalInputs: AdditionalInputs;
};
export type ItemLevelSellerInputsList = {
    AdditionalSellerInputs: {
        AdditionalInputFieldName: string; // valid values available via GetAdditionalSellerInputs API
        AdditionalSellerInput: {
            DateType: 'String' | 'Boolean' | 'Integer' | 'Timestamp' | 'Address' | 'Weight' | 'Dimension' | 'Currency';
            ValueAsString?: string;
            ValueAsBoolean?: boolean; // true | false ?
            ValueAsInteger?: number;
            ValueAsTimestamp?: DateTime;
            ValueAsAddress?: MerchantFulfillment.Address;
            ValueAsWeight?: Weight;
            ValueAsDimeison?: Dimensions; // TODO: Dimension? not Dimensions?
            ValueAsCurrency?: Currency;
        }
    }
};
export type Label = {
    CustomTextForLabel?: string;
    Dimensions: LabelDimensions;
    FileContents: FileContents;
    LabelFormat?: string; // get values from GetEligibleShippingServices
    StandardIForLabel?: string;
};
export type LabelCustomization = {
    CustomTextForLabel?: string;
    StandardIdForLabel: 'AmazonOrderId';
};
export type LabelDimensions = {
    Length: number;
    Width: number;
    Unit: 'inches' | 'centimeters';
};
export type PackageDimensions = {
    Length?: number;
    Width?: number;
    Height?: number;
    Unit?: 'inches' | 'centimeters';
    PredefinedPackageDimensions?: string; // TODO: has a ton of options, see https://docs.developer.amazonservices.com/en_UK/merch_fulfill/MerchFulfill_PrePackDimenEnum.html
};
export type RejectedShippingService = {
    CarrierName: string;
    ShippingServiceId: string;
    RejectionReasonCode: string; // INELIGIBLE, SHIP_DATE_OUT_OF_RANGE, CARRIER_CANNOT_SHIP_TO_POBOX, more?
    RejectionReasonMessage: string;
    ShippingServiceName: string;
};
export type SellerInputDefinition = {
    IsRequired: boolean; // true | false ?
    DataType: 'String' | 'Boolean' | 'Integer' | 'Timestamp' | 'Address'| 'Weight' | 'Dimension' | 'Currency';
    Constraints: 'ValidationRegEx' | 'ValidationString';
    InputDisplayText: string;
    InputTarget?: 'ITEM_LEVEL' | 'SHIPMENT_LEVEL';
    StoredValue: {
        DataType: 'String' | 'Boolean' | 'Integer' | 'Timestamp' | 'Address' | 'Weight' | 'Dimension' | 'Currency';
        ValueAsString?: string;
        ValueAsBoolean?: boolean;
        ValueAsInteger?: number;
        ValueAsTimestamp?: DateTime;
        ValueAsAddress?: MerchantFulfillment.Address;
        ValueAsWeight?: Weight;
        ValueAsDimension?: Dimensions;
        ValueAsCurrency?: CurrencyAmount;
    };
    RestrictedSetValues?: string;
};
export type Shipment = {
    ShipmentId: string;
    AmazonOrderId: string;
    SellerOrderId?: string;
    ItemList: Array<MerchantFulfillment.Item>;
    ShipFromAddress: MerchantFulfillment.Address;
    ShipToAddress: MerchantFulfillment.Address;
    PackageDimensions: PackageDimensions;
    Weight: Weight;
    Insurance: CurrencyAmount;
    ShippingService: ShippingService;
    Label: Label;
    Status: 'Purchased' | 'RefundPending' | 'RefundRejected' | 'RefundApplied';
    TrackingId?: string;
    CreatedDate: DateTime;
    LastUpdatedDate?: DateTime;
};
export type ShipmentLevelFields = {
    AdditionalInputFieldName?: 'NON_DELIVERABLE_INSTRUCTIONS' | 'SENDER_ADDRESS_TRANSLATED';
    SellerInputDefinition?: SellerInputDefinition;
};
export type ShipmentLevelSellerInputsList = {
    AdditionalSellerInputs: {
        AdditionalInputFieldName: string; // GetAdditionalSellerInputs
        AdditionalSellerInput: {
            DataType: 'String' | 'Boolean' | 'Integer' | 'Timestamp' | 'Address' | 'Weight' | 'Dimension' | 'Currency';
            ValueAsString?: string;
            ValueAsBoolean?: boolean;
            ValueAsInteger?: number;
            ValueAsTimestamp?: DateTime;
            ValueAsAddress?: MerchantFulfillment.Address;
            ValueAsWeight?: Weight;
            ValueAsDimension?: Dimensions;
            ValueAsCurrency?: CurrencyAmount;
        }
    }
};
export type ShipmentRequestDetails = {
    AmazonOrderId: string;
    SellerOrderId?: string;
    ItemList: Array<MerchantFulfillment.Item>;
    ShipFromAddress: MerchantFulfillment.Address;
    PackageDimensions: PackageDimensions;
    Weight: Weight;
    MustArriveByDate?: DateTime;
    ShipDate?: DateTime;
    ShippingServiceOptions: ShippingServiceOptions;
    LabelCustomization: LabelCustomization;
};
export type ShippingOfferingFilter = {
    IncludeComplexShippingOptions?: boolean; // true | false ?
};
export type ShippingService = {
    ShippingServiceName: string;
    CarrierName: string;
    ShippingServiceId: string;
    ShippingServiceOfferId: string;
    ShipDate: DateTime;
    EarliestEstimatedDeliveryDate?: DateTime;
    LatestEstimatedDeliveryDate?: DateTime;
    Rate: CurrencyAmount;
    ShippingServiceOptions: ShippingServiceOptions;
    AvailableLabelFormats?: 'PNG' | 'PDF' | 'ZPL203';
    RequiresAdditionalSellerInputs: boolean; // true | false ?
};
export type ShippingServiceOptions = {
    DeliveryExperience: 'DeliveryConfirmationWithAdultSignature' | 'DeliveryConfirmationWithSignature' | 'DeliveryConfirmationWithoutSignature' | 'NoTracking';
    DeclaredValue?: CurrencyAmount;
    CarrierWillPickup: boolean; // true | false ?
    LabelFormat: string; // GetEligibleShippingServices.AvailableLabelFormats
};
export type TemporarilyUnavailableCarrier = {
    CarrierName: string;
};
export type TermsAndConditionsNotAcceptedCarrier = {
    CarrierName: string;
};
export type TransparencyCodeList = {
    TransparencyCode: string;
};

// https://docs.developer.amazonservices.com/en_UK/orders-2013-09-01/Orders_Datatypes.html

declare namespace Orders {
    export type Address = {
        Name: string;
        AddressLine1?: string;
        AddressLine2?: string;
        AddressLine3?: string;
        City?: string;
        Municipality?: string;
        County?: string;
        District?: string;
        StateOrRegion?: string;
        PostalCode?: string;
        CountryCode?: string;
        Phone?: string;
        AddressType?: 'Commercial' | 'Residential';
    }
}
export type BuyerCustomizedInfo = {
    CustomizedURL: string;
};
export type BuyerTaxInfo = {
    CompanyLegalName?: string;
    TaxingRegion?: string;
    TaxClassifications?: Array<TaxClassification>;
};
export type Money = {
    // Amazon, why oh why, are CurrencyAmount, Currency, and Money, all ever so slightly different?
    CurrencyCode?: string;
    Amount?: string;
};
export type Order = {
    AmazonOrderId: string;
    SellerOrderId?: string;
    PurchaseDate: DateTime;
    LastUpdateDate: DateTime;
    OrderStatus: string; // TODO: not sure what valid values are here, not in docs
    FulfillmentChannel?: 'AFN' | 'MFN';
    SalesChannel?: string;
    OrderChannel?: string;
    ShipServiceLevel?: string;
    ShippingAddress?: Orders.Address;
    OrderTotal?: Money;
    NumberOfItemsShipped: number;
    NumberOfItemsUnshipped: number;
    PaymentExecutionDetail?: Array<PaymentExecutionDetailItem>;
    PaymentMethod?: 'COD' | 'CVS' | 'Other';
    PaymentMethodDetails?: PaymentMethodDetails;
    IsReplacementOrder?: boolean; // true | false ?
    ReplacedOrderId?: string;
    MarketplaceId?: string;
    BuyerEmail?: string;
    BuyerName?: string;
    BuyerCountry?: string;
    BuyerTaxInfo?: BuyerTaxInfo;
    ShipmentServiceLevelCategory?: 'Expedited' | 'FreeEconomy' | 'NextDay' | 'SameDay' | 'SecondDay' | 'Scheduled' | 'Standard'; // TODO: isn't servicelevel used elsewhere, but the docs didn't have a list< but this one does? should use it.
    EasyShipShipmentStatus?: 'PendingPickUp' | 'LabelCanceled' | 'PickedUp' | 'OutForDelivery' | 'Damaged' | 'Delivered' | 'RejectedByBuyer' | 'Undeliverable' | 'ReturnedToSeller' | 'ReturningToSeller';
    OrderType?: 'StandardOrder' | 'Preorder' | 'SourcingOnDemandOrder';
    EarliestShipDate?: DateTime;
    LatestShipDate?: DateTime;
    EarliestDeliveryDate?: DateTime;
    LatestDeliveryDate?: DateTime;
    IsBusinessOrder?: boolean; // true | false ?
    IsSoldByAB?: boolean; // true | false ?
    PurchaseOrderNumber?: string;
    IsPrime?: boolean; // true | false ?
    IsPremiumOrder?: boolean; // true | false ?
    IsGlobalExpressEnabled?: boolean; // true | false ?
    PromiseResponseDueDate?: DateTime;
    IsEstimatedShipDateSet?: boolean; // true | false ?
};
export type OrderItem = {
    ASIN: string;
    OrderItemId: string;
    SellerSKU?: string;
    BuyerCustomizedInfo?: BuyerCustomizedInfo;
    Title?: string;
    QuantityOrdered: number;
    QuantityShipped?: number;
    PointsGranted?: PointsGranted;
    ProductInfo?: ProductInfo;
    ItemPrice?: Money;
    ShippingPrice?: Money;
    GiftWrapPrice?: Money;
    TaxCollection?: TaxCollection;
    ItemTax?: Money;
    ShippingTax?: Money;
    GiftWrapTax?: Money;
    ShippingDiscount?: Money;
    ShippingDiscountTax?: Money;
    PromotionDiscount?: Money;
    PromotionDiscountTax?: Money;
    PromotionIds?: Array<string>;
    CODFee?: Money;
    CODFeeDiscount?: Money;
    IsGift?: boolean; // true | false ?
    GiftMessageText?: string;
    GiftWrapLevel?: string;
    ConditionNote?: string;
    ConditionId?: 'New' | 'Used' | 'Collectible' | 'Refurbished' | 'Preorder' | 'Club';
    ConditionSubtypeId?: 'New' | 'Mint' | 'Very Good' | 'Good' | 'Acceptable' | 'Poor' | 'Club' | 'OEM' | 'Warranty' | 'Refurbished Warranty' | 'Refurbished' | 'Open Box' | 'Any' | 'Other';
    ScheduledDeliveryStartDate?: DateTime;
    ScheduledDeliveryEndDate?: DateTime;
    PriceDesignation?: 'BusinessPrice';
    IsTransparency?: boolean; // true | false ?
    SerialNumberRequired?: boolean; // true | false ?
};
export type PaymentExecutionDetailItem = {
    Payment: Money;
    PaymentMethod: 'COD' | 'GC' | 'PointsAccount'; // TODO: All of these values are only available in JP. Docs say it's not optional. What?
};
export type PaymentMethodDetails = {
    PaymentMethodDetail?: string; // GiftCertificate | CreditCard | ????
};
export type ProductInfo = {
    NumberOfItems?: number;
};
export type PointsGranted = {
    PointsNumber?: number;
    PointsMonetaryValue?: Money;
};
export type TaxClassification = {
    Name: string;
    Value: string;
};
export type TaxCollection = {
    Model: 'MarketplaceFacilitator'; // TODO: are other values possible?!
    ResponsibleParty: 'Amazon Services, Inc.'; // TODO: are other values possible?!
};

// https://docs.developer.amazonservices.com/en_UK/products/Products_Datatypes.html

export type AvailabilityType = 'NOW' | 'FUTURE_WITHOUT_DATE' | 'FUTURE_WITH_DATE';
export type BuyBoxPrice = {
    condition: 'New' | 'Used' | 'Collectible' | 'Refurbished' | 'Club';
    LandedPrice: MoneyType;
    ListingPrice: MoneyType;
    Shipping: MoneyType;
    Points?: Points;
};
export type DetailedShippingTimeType = {
    minimumHours?: number;
    maximumHours?: number;
    availableDate?: DateTime;
    availabilityType?: AvailabilityType;
};
export type FeeDetail = {
    FeeType: FeeType;
    FeeAmount: MoneyType;
    FeePromotion?: MoneyType;
    TaxAmount?: MoneyType;
    FinalFee: MoneyType;
    IncludedFeeDetailList?: Array<FeeDetail>;
};
export type FeesEstimate = {
    TimeOfFeesEstimation: DateTime;
    TotalFeesEstimate: MoneyType;
    FeeDetailList: Array<FeeDetail>;
};
export interface FeesEstimateIdentifier {
    MarketplaceId: string;
    IdType: 'ASIN' | 'SellerSKU';
    IdValue: string;
    PriceToEstimateFees: PriceToEstimateFees;
    IsAmazonFulfilled: boolean; // true | false ?
    SellerInputIdentifier: string;
}
export interface FeesEstimateRequest extends FeesEstimateIdentifier {
    Identifier: string;
}
export type FeesEstimateResult = {
    FeesEstimateIdentifier: FeesEstimateIdentifier;
    FeesEstimate?: FeesEstimate;
    Status: 'Success' | 'ClientError' | 'ServiceError';
    Error?: {
        Type: string;
        Code: string;
        Message: string;
    };
};
export type FeeType =
| 'ReferralFee'
| 'VariableClosingFee'
| 'PerItemFee'
| 'FBAFees'
| 'FBAPickAndPack'
| 'FBAWeightHandling'
| 'FBAOrderHandling'
| 'FBADeliveryServicesFee';
export type FulfillmentChannelType = 'Amazon' | 'Merchant';
export type LowestPrice = { // TODO: this has a virtually identical shape to something above, can we consolidate?
    condition: 'New' | 'Used' | 'Collectible' | 'Refurbished' | 'Club'; // TODO: this is used in multiple places, consolidate
    fulfillmentChannel: FulfillmentChannelType;
    LandedPrice: MoneyType;
    ListingPrice: MoneyType;
    Shipping: MoneyType;
    Points?: Points;
};
export type MarketplaceType = string; // [A-Z0-9]+
export type MoneyType = {
    Amount: number;
    CurrencyCode: 'USD' | 'EUR' | 'GBP' | 'RMB' | 'INR' | 'JPY' | 'CAD' | 'MXN';
};
export type OfferCount = {
    condition: 'New' | 'Used' | 'Collectible' | 'Refurbished' | 'Club'; // TODO: this is used in multiple places, consolidate
    fulfillmentChannel: FulfillmentChannelType;
};
export type OfferCountType = {
    OfferCount: OfferCount;
};
export type Points = {
    PointsNumber: number;
    PointsMonetaryValue: MoneyType;
};
export type PriceToEstimateFees = {
    ListingPrice: MoneyType;
    Shipping?: MoneyType;
    Points?: Points;
};
export type SellerFeedbackRating = {
    SellerPositiveFeedbackRating?: number;
    FeedbackCount?: number;
};
export type ShipsFrom = {
    State?: string;
    Country?: string;
};

// https://docs.developer.amazonservices.com/en_UK/recommendations/Recommendations_Datatypes.html

export type AdvertisingRecommendation = {
    RecommendationId: string;
    RecommendationReason: string;
    LastUpdated: DateTime;
    ItemIdentifier: ProductIdentifier;
    ItemName?: string;
    BrandName?: string;
    ProductCategory?: string;
    SalesRank?: number;
    YourPricePlusShipping: Price;
    LowestPricePlusShipping: Price;
    AvailableQuantity: number;
    SalesForTheLast30Days: number;
};
export type CategoryQuery = {
    RecommendationCategory: 'Selection' | 'Fulfillment' | 'ListingQuality' | 'GlobalSelling' | 'Advertising';
    FilterOptions: {
        QualitySet?: 'Defect' | 'Quarantine'; // ListingQuality
        ListingStatus?: 'Active' | 'Inactive'; // ListingQuality
        BrandName?: string; // Selection, Fulfillment, GlobalSelling, Advertising
        ProductCategory?: string; // Selection, Fulfillment, GlobalSelling, Advertising
        IncludeCommonRecommendations?: boolean; // Selection
    };
};
export type DimensionMeasure = {
    Value: number;
    Unit: string;
};
export type FulfillmentRecommendation = {
    RecommendationId: string;
    RecommendationReason: string;
    LastUpdated: DateTime;
    ItemIdentifier: ProductIdentifier;
    ItemName?: string;
    BrandName?: string;
    ProductCategory?: string;
    SalesRank?: number;
    BuyboxPrice?: Price;
    NumberOfOffers?: number;
    NumberOfOffersFulfilledByAmazon?: number;
    AverageCustomerReview?: number;
    NumberOfCustomerReviews?: number;
    ItemDimensions?: ItemDimensions;
};
export type GlobalSellingRecommendation = FulfillmentRecommendation;
export type InventoryRecommendation = {
    RecommendationId: string;
    RecommendationReason: string;
    LastUpdated: DateTime;
    ItemIdentifier: ProductIdentifier;
    ItemName?: string;
    FulfillmentChannel?: 'MFN' | 'AFN';
    AvailableQuantity?: number;
    DaysUntilStockRunsOut?: number;
    DaysOutOfStockLast30Days?: number;
};
export type ItemDimensions = {
    Height: DimensionMeasure;
    Width: DimensionMeasure;
    Length: DimensionMeasure;
    Weight: WeightMeasure;
};
export type Price = {
    CurrencyCode: string;
    Amount: number;
};
export type PricingRecommendation = {
    RecommendationId: string;
    RecommendationReason: string;
    LastUpdated: DateTime;
    ItemIdentifier: ProductIdentifier;
    ItemName?: string;
    Condition?: string;
    SubCondition?: string;
    FulfillmentChannel?: 'MFN' | 'AFN';
    YourPricePlusShipping?: Price;
    LowestPricePlusShipping?: Price;
    PriceDifferenceToLowPrice?: Price;
    MedianPricePlusShipping?: Price;
    LowestMerchantFulfilledOfferPrice?: Price;
    LowestAmazonFulfilledOfferPrice?: Price;
    NumberOfOffers?: number;
    NumberOfMerchantFulfilledOffers?: number;
    NumberOfAmazonFulfilledOffers?: number;
};
export type ProductIdentifier = {
    Asin?: string;
    Sku?: string;
    Upc?: string;
};
export type WeightMeasure = {
    Value: number;
    Unit: string;
};

// https://docs.developer.amazonservices.com/en_UK/reports/Reports_Datatypes.html

export type ReportInfo = {
    ReportId: string;
    ReportType: string;
    ReportRequestId: string;
    AvailableDate: DateTime;
    Acknowledged: boolean; // true | false ?
    AcknowledgedDate: DateTime;
};
export type ReportRequestInfo = {
    ReportRequestId: string;
    ReportType: string; // TODO: make a union of all the report types
    StartDate: DateTime;
    EndDate: DateTime;
    Scheduled: boolean; // true | false ?
    SubmittedDate: DateTime;
    ReportProcessingStatus: string; // TODO: make a union of all report processing statuses?
    GeneratedReportId: string;
    StartedProcessingDate: DateTime;
    CompletedDate: DateTime;
};
export type ReportSchedule = {
    ReportType: string; // TODO: make a union of all the report types
    Schedule: string; // TODO: make a union of all valid schedule strings?
    ScheduledDate: DateTime;
};

// https://docs.developer.amazonservices.com/en_UK/sellers/Sellers_Datatypes.html

export type Marketplace = {
    MarketplaceId: string;
    Name: string;
    DefaultCountryCode: string;
    DefaultCurrencyCode: string;
    DefaultLanguageCode: string;
    DomainName: string;
};
export type Participation = {
    MarketplaceId: string;
    SellerId: string;
    HasSellerSuspendedListings: 'Yes' | 'No';
};

// https://docs.developer.amazonservices.com/en_UK/shipment_invoicing/ShipmentInvoicing_Datatypes.html

export namespace ShipmentInvoicing {
    export type Address = {
        Name: string;
        AddressLine1?: string;
        AddressLine2?: string;
        AddressLine3?: string;
        City?: string;
        County?: string;
        District?: string;
        StateOrRegion?: string;
        PostalCode?: string;
        CountryCode?: string;
        Phone?: string;
        AddressType?: 'Commercial' | 'Residential';
    };
    // TODO: extract the previous declaration of Shipment to a namespace
    export type Shipment = {
        AmazonShipmentId: string;
        InvoiceStatus: 'Processing' | 'Accepted' | 'NotFound' | 'Errored';
    };
    // TODO: extract the previous declaration of ShipmentItem to a namespace
    export type ShipmentItem = {
        ASIN: string;
        SellerSKU?: string;
        OrderItemId: string;
        Title?: string;
        QuantityOrdered: number;
        ItemPrice?: Money;
        ShippingPrice?: Money;
        GiftWrapPrice?: Money;
        ShippingDiscount?: Money;
        PromotionDiscount?: Money;
        SerialNumber: SerialNumbers;
    };
}
export type SerialNumbers = {
    SerialNumber?: string;
};
export type ShipmentDetail = {
    AmazonOrderId: string;
    AmazonShipmentId: string;
    PurchaseDate: DateTime;
    ShippingAddress?: ShipmentInvoicing.Address;
    PaymentMethodDetails?: PaymentMethodDetails;
    MarketplaceId?: string;
    BuyerName?: string;
    BuyerCounty?: string;
    BuyerTaxInfo?: string;
    ShipmentItems: ShipmentInvoicing.ShipmentItem;
    WarehouseId?: string;
};

// https://docs.developer.amazonservices.com/en_UK/subscriptions/Subscriptions_Datatypes.html

export type AttributeKeyValue = {
    Key: 'sqsQueueUrl';
    Value: string;
};
export type Destination = {
    DeliveryChannel: 'SQS';
    AttributeList?: Array<AttributeKeyValue>;
};
export type Subscription = {
    NotificationType: string; // TODO: see https://docs.developer.amazonservices.com/en_UK/subscriptions/Subscriptions_NotificationType.html
    Destination: Destination;
    IsEnabled: boolean; // true | false ?
};
