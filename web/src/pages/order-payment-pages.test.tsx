import {
  Children,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { API_ENDPOINTS } from "@/api/endpoint";
import type { EventDetail } from "@/types/eventDetailTypes";
import type {
  OrderEventSnapshot,
  OrderRecord,
  OrderTicketSnapshot,
  TransactionLifecycleRecord,
  TransactionRecord,
} from "@/types/orderTransactionTypes";
import OrderStep1Page from "./OrderStep1Page";
import PaymentDetailPage from "./PaymentDetailPage";

type AuthUser = {
  name?: string | null;
  email?: string | null;
} | null;

type RouterState = {
  params: Record<string, string | undefined>;
  location: {
    search: string;
  };
  navigate: ReturnType<typeof vi.fn>;
};

type MockState = {
  apiClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
  };
  auth: {
    user: AuthUser;
  };
  router: RouterState;
  toast: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };
  runtimeRef: {
    current: HookRuntime | null;
  };
};

const mockState = vi.hoisted<MockState>(() => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
  auth: {
    user: {
      name: "Alice Customer",
      email: "alice@example.com",
    },
  },
  router: {
    params: {},
    location: {
      search: "",
    },
    navigate: vi.fn(),
  },
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  runtimeRef: {
    current: null,
  },
}));

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");

  return {
    ...actual,
    useEffect: (
      effect: () => void | (() => void),
      deps?: readonly unknown[],
    ) => {
      const runtime = mockState.runtimeRef.current;
      if (!runtime) {
        throw new Error("useEffect was called outside the hook runtime.");
      }

      runtime.useEffect(effect, deps);
    },
    useMemo: <T,>(factory: () => T, deps?: readonly unknown[]) => {
      const runtime = mockState.runtimeRef.current;
      if (!runtime) {
        throw new Error("useMemo was called outside the hook runtime.");
      }

      return runtime.useMemo(factory, deps);
    },
    useState: <T,>(initialState: T | (() => T)) => {
      const runtime = mockState.runtimeRef.current;
      if (!runtime) {
        throw new Error("useState was called outside the hook runtime.");
      }

      return runtime.useState(initialState);
    },
  };
});

vi.mock("@/api/clients", () => ({
  apiClient: mockState.apiClient,
}));

vi.mock("@/store/auth-store", () => ({
  useAuthStore: <T,>(selector: (state: { user: AuthUser }) => T) =>
    selector({ user: mockState.auth.user }),
}));

vi.mock("react-router", async () => {
  const React = await vi.importActual<typeof import("react")>("react");

  return {
    Link: ({
      children,
      to,
      ...props
    }: {
      children?: ReactNode;
      to: string;
      [key: string]: unknown;
    }) => React.createElement("a", { href: to, ...props }, children),
    useLocation: () => mockState.router.location,
    useNavigate: () => mockState.router.navigate,
    useParams: () => mockState.router.params,
  };
});

vi.mock("@/components/ui/button", async () => {
  const React = await vi.importActual<typeof import("react")>("react");

  return {
    Button: ({
      children,
      ...props
    }: {
      children?: ReactNode;
      [key: string]: unknown;
    }) => React.createElement("button", props, children),
  };
});

vi.mock("@/components/ui/input", async () => {
  const React = await vi.importActual<typeof import("react")>("react");

  return {
    Input: (props: Record<string, unknown>) =>
      React.createElement("input", props),
  };
});

vi.mock("@/components/ui/label", async () => {
  const React = await vi.importActual<typeof import("react")>("react");

  return {
    Label: ({
      children,
      ...props
    }: {
      children?: ReactNode;
      [key: string]: unknown;
    }) => React.createElement("label", props, children),
  };
});

vi.mock("@/components/TransactionStatusBadge", async () => {
  const React = await vi.importActual<typeof import("react")>("react");

  return {
    default: ({ status }: { status: string }) =>
      React.createElement("span", { "data-status": status }, status),
  };
});

vi.mock("sonner", () => ({
  toast: mockState.toast,
}));

type EffectCallback = () => void | (() => void);

class HookRuntime {
  private stateIndex = 0;
  private memoIndex = 0;
  private effectIndex = 0;
  private readonly states: unknown[] = [];
  private readonly memos: Array<{
    deps?: readonly unknown[];
    value: unknown;
  }> = [];
  private readonly effects: Array<{
    deps?: readonly unknown[];
    cleanup?: void | (() => void);
  }> = [];
  private readonly scheduledEffects: Array<{
    index: number;
    deps?: readonly unknown[];
    effect: EffectCallback;
  }> = [];

  needsRerender = false;

  render<T>(component: () => T): T {
    this.stateIndex = 0;
    this.memoIndex = 0;
    this.effectIndex = 0;
    mockState.runtimeRef.current = this;

    try {
      return component();
    } finally {
      mockState.runtimeRef.current = null;
    }
  }

  hasScheduledEffects() {
    return this.scheduledEffects.length > 0;
  }

  flushEffects() {
    const pendingEffects = this.scheduledEffects.splice(0);

    for (const pendingEffect of pendingEffects) {
      this.effects[pendingEffect.index]?.cleanup?.();
      const cleanup = pendingEffect.effect();

      this.effects[pendingEffect.index] = {
        deps: pendingEffect.deps,
        cleanup,
      };
    }
  }

  useEffect(effect: EffectCallback, deps?: readonly unknown[]) {
    const index = this.effectIndex++;
    const previousEffect = this.effects[index];

    if (!previousEffect || haveDepsChanged(previousEffect.deps, deps)) {
      this.scheduledEffects.push({
        index,
        deps: deps?.slice(),
        effect,
      });
    }
  }

  useMemo<T>(factory: () => T, deps?: readonly unknown[]) {
    const index = this.memoIndex++;
    const previousMemo = this.memos[index];

    if (!previousMemo || haveDepsChanged(previousMemo.deps, deps)) {
      const value = factory();
      this.memos[index] = {
        deps: deps?.slice(),
        value,
      };

      return value;
    }

    return previousMemo.value as T;
  }

  useState<T>(
    initialState: T | (() => T),
  ): [T, (nextState: T | ((previousState: T) => T)) => void] {
    const index = this.stateIndex++;

    if (!(index in this.states)) {
      this.states[index] =
        typeof initialState === "function"
          ? (initialState as () => T)()
          : initialState;
    }

    const setState = (nextState: T | ((previousState: T) => T)) => {
      const previousState = this.states[index] as T;
      const resolvedState =
        typeof nextState === "function"
          ? (nextState as (previousState: T) => T)(previousState)
          : nextState;

      if (!Object.is(previousState, resolvedState)) {
        this.states[index] = resolvedState;
        this.needsRerender = true;
      }
    };

    return [this.states[index] as T, setState];
  }
}

type ResolvedNode = null | string | number | ResolvedElement | ResolvedNode[];

type ResolvedElement = {
  type: string;
  props: Record<string, unknown> & {
    children: ResolvedNode[];
  };
};

type ClassComponentLike = new (
  props: Record<string, unknown>,
) => {
  render: () => ReactNode;
};

class MockFormData {
  private readonly values = new Map<string, unknown>();

  append(name: string, value: unknown) {
    this.values.set(name, value);
  }

  get(name: string) {
    return this.values.get(name) ?? null;
  }
}

class PageHarness {
  private readonly runtime = new HookRuntime();
  private readonly component: () => ReactElement;
  tree: ResolvedNode = null;

  constructor(component: () => ReactElement) {
    this.component = component;
  }

  async mount() {
    this.tree = await renderAndSettle(this.component, this.runtime);
    return this;
  }

  async refresh() {
    this.tree = await renderAndSettle(this.component, this.runtime);
    return this;
  }

  async advanceTime(ms: number) {
    await vi.advanceTimersByTimeAsync(ms);
    return this.refresh();
  }

  hasText(text: string) {
    return normalizeText(readNodeText(this.tree)).includes(normalizeText(text));
  }

  getButtonByText(text: string) {
    return findElement(this.tree, (element) => {
      if (element.type !== "button") {
        return false;
      }

      return normalizeText(readNodeText(element)).includes(normalizeText(text));
    });
  }

  getInputByPlaceholder(placeholder: string) {
    return findElement(this.tree, (element) => {
      return (
        element.type === "input" && element.props.placeholder === placeholder
      );
    });
  }

  getInputById(id: string) {
    return findElement(this.tree, (element) => {
      return element.type === "input" && element.props.id === id;
    });
  }

  async click(text: string) {
    const button = this.getButtonByText(text);
    const onClick = button.props.onClick as
      | ((event: { preventDefault: () => void }) => void)
      | undefined;

    if (button.props.disabled) {
      throw new Error(`Button "${text}" is disabled.`);
    }

    if (!onClick) {
      throw new Error(`Button "${text}" is not clickable.`);
    }

    onClick({ preventDefault() {} });
    return this.refresh();
  }

  async changeInputValue(placeholder: string, value: string) {
    const input = this.getInputByPlaceholder(placeholder);
    const onChange = input.props.onChange as
      | ((event: { target: { value: string } }) => void)
      | undefined;

    if (!onChange) {
      throw new Error(`Input "${placeholder}" does not support changes.`);
    }

    onChange({ target: { value } });
    return this.refresh();
  }

  async selectFile(id: string, file: unknown) {
    const input = this.getInputById(id);
    const onChange = input.props.onChange as
      | ((event: { target: { files: unknown[] } }) => void)
      | undefined;

    if (!onChange) {
      throw new Error(`Input "${id}" does not support file selection.`);
    }

    onChange({ target: { files: [file] } });
    return this.refresh();
  }
}

describe("OrderStep1Page", () => {
  it("creates an order with the applied voucher and redeemed points preview", async () => {
    vi.useFakeTimers();

    mockState.router.params = { id: "12" };
    mockState.router.location = { search: "?ticketId=2" };

    mockState.apiClient.get.mockResolvedValueOnce({
      data: {
        data: createEventDetail(),
      },
    });
    mockState.apiClient.post
      .mockResolvedValueOnce({
        data: {
          data: {
            unitPrice: 200000,
            quantity: 1,
            subTotalAmount: 200000,
            voucherDiscountAmount: 50000,
            pointsDiscountAmount: 20000,
            totalDiscountAmount: 70000,
            totalAmount: 130000,
            availablePoints: 500,
            appliedRedeemedPoints: 200,
            voucherCode: "PROMO50",
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: {
            transaction: {
              id: 9901,
            },
          },
        },
      });

    const page = await new PageHarness(OrderStep1Page).mount();

    await page.changeInputValue("+628123456789", " +628123456789 ");
    await page.changeInputValue("PROMO10", "promo50");
    await page.changeInputValue("0", "200 points");
    await page.advanceTime(300);

    expect(mockState.apiClient.post).toHaveBeenNthCalledWith(
      1,
      API_ENDPOINTS.ORDERS.PREVIEW,
      {
        eventId: 12,
        ticketTypeId: 2,
        quantity: 1,
        voucherCode: "PROMO50",
        redeemedPoints: 200,
      },
    );

    await page.click("Create Order & Continue");

    expect(mockState.apiClient.post).toHaveBeenNthCalledWith(
      2,
      API_ENDPOINTS.ORDERS.CREATE,
      {
        eventId: 12,
        ticketTypeId: 2,
        quantity: 1,
        voucherCode: "PROMO50",
        redeemedPoints: 200,
        buyerName: "Alice Customer",
        buyerEmail: "alice@example.com",
        buyerPhone: "+628123456789",
        paymentMethod: "BANK_TRANSFER",
      },
    );
    expect(mockState.toast.success).toHaveBeenCalledWith(
      "Order created. Finish the payment before it expires.",
    );
    expect(mockState.router.navigate).toHaveBeenCalledWith(
      "/transactions/9901",
    );
  });

  it("caps quantity at the maximum checkout limit of ten tickets", async () => {
    vi.useFakeTimers();

    mockState.router.params = { id: "12" };
    mockState.router.location = { search: "" };

    mockState.apiClient.get.mockResolvedValueOnce({
      data: {
        data: createEventDetail({
          ticket: [
            {
              id: 1,
              name: "Regular",
              price: 100000,
              quota: 25,
              status: "ACTIVE",
              description: "General admission ticket",
            },
          ],
        }),
      },
    });

    const page = await new PageHarness(OrderStep1Page).mount();

    for (let index = 0; index < 9; index += 1) {
      await page.click("add");
    }

    const incrementButton = page.getButtonByText("add");

    expect(incrementButton.props.disabled).toBe(true);
    expect(page.hasText("IDR 1.000.000")).toBe(true);
  });

  it("blocks order creation when the buyer phone number is invalid", async () => {
    vi.useFakeTimers();

    mockState.router.params = { id: "12" };
    mockState.router.location = { search: "" };

    mockState.apiClient.get.mockResolvedValueOnce({
      data: {
        data: createEventDetail(),
      },
    });

    const page = await new PageHarness(OrderStep1Page).mount();

    await page.changeInputValue("+628123456789", "08123");
    await page.click("Create Order & Continue");

    expect(mockState.toast.error).toHaveBeenCalledWith(
      "Enter a valid phone number.",
    );
    expect(mockState.apiClient.post).not.toHaveBeenCalled();
  });
});

describe("PaymentDetailPage", () => {
  it("uploads payment proof and refreshes the transaction detail", async () => {
    vi.useFakeTimers();

    mockState.router.params = { transactionId: "77" };

    mockState.apiClient.get
      .mockResolvedValueOnce({
        data: {
          data: createTransactionRecord(),
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: createTransactionRecord({
            transaction: {
              status: "WAITING_FOR_ADMIN_CONFIRMATION",
              paymentProof: "https://cdn.example.com/payment-proof.png",
            },
          }),
        },
      });
    mockState.apiClient.patch.mockResolvedValueOnce({ data: {} });

    const page = await new PageHarness(PaymentDetailPage).mount();
    const file = { name: "payment-proof.png", type: "image/png" };

    await page.selectFile("payment-proof", file);
    await page.click("Upload payment proof");

    const uploadCall = mockState.apiClient.patch.mock.calls[0];
    const submittedFormData = uploadCall[1] as MockFormData;

    expect(uploadCall[0]).toBe(
      API_ENDPOINTS.TRANSACTIONS.UPLOAD_PAYMENT_PROOF(77),
    );
    expect(submittedFormData.get("paymentProof")).toBe(file);
    expect(uploadCall[2]).toEqual({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    expect(mockState.toast.success).toHaveBeenCalledWith(
      "Payment proof uploaded successfully.",
    );
    expect(mockState.apiClient.get).toHaveBeenCalledTimes(2);
    expect(page.hasText("Payment proof received")).toBe(true);
    expect(page.hasText("Upload is locked")).toBe(true);
  });

  it("cancels a pending transaction and refreshes the latest status", async () => {
    vi.useFakeTimers();

    mockState.router.params = { transactionId: "77" };

    mockState.apiClient.get
      .mockResolvedValueOnce({
        data: {
          data: createTransactionRecord({
            transaction: {
              status: "WAITING_FOR_ADMIN_CONFIRMATION",
            },
          }),
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: createTransactionRecord({
            order: {
              status: "CANCELED",
            },
            transaction: {
              status: "CANCELED",
            },
          }),
        },
      });
    mockState.apiClient.patch.mockResolvedValueOnce({ data: {} });

    const page = await new PageHarness(PaymentDetailPage).mount();

    await page.click("Cancel transaction");

    expect(mockState.apiClient.patch).toHaveBeenCalledWith(
      API_ENDPOINTS.TRANSACTIONS.CANCEL(77),
      {},
    );
    expect(mockState.toast.success).toHaveBeenCalledWith(
      "Transaction canceled.",
    );
    expect(mockState.apiClient.get).toHaveBeenCalledTimes(2);
    expect(page.hasText("Transaction canceled")).toBe(true);
  });

  it("shows free-ticket transactions as organizer review without upload controls", async () => {
    vi.useFakeTimers();

    mockState.router.params = { transactionId: "88" };

    mockState.apiClient.get.mockResolvedValueOnce({
      data: {
        data: createTransactionRecord({
          order: {
            totalAmount: 0,
            subTotalAmount: 0,
            unitPrice: 0,
          },
          transaction: {
            status: "WAITING_FOR_ADMIN_CONFIRMATION",
            paymentMethod: "BANK_TRANSFER",
          },
        }),
      },
    });

    const page = await new PageHarness(PaymentDetailPage).mount();

    expect(
      page.hasText("No payment proof is required for zero-price tickets."),
    ).toBe(true);
    expect(page.hasText("Not required for free ticket")).toBe(true);
    expect(
      page.hasText(
        "No upload is needed. This free ticket is already waiting for organizer review.",
      ),
    ).toBe(true);
    expect(page.hasText("Upload payment proof")).toBe(false);
  });

  it("rejects invalid transaction ids before making an API call", async () => {
    mockState.router.params = { transactionId: "invalid-id" };

    const page = await new PageHarness(PaymentDetailPage).mount();

    expect(mockState.apiClient.get).not.toHaveBeenCalled();
    expect(page.hasText("Invalid transaction ID.")).toBe(true);
  });
});

let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  mockState.apiClient.get.mockReset();
  mockState.apiClient.post.mockReset();
  mockState.apiClient.patch.mockReset();
  mockState.toast.success.mockReset();
  mockState.toast.error.mockReset();
  mockState.router.navigate.mockReset();
  mockState.router.params = {};
  mockState.router.location = { search: "" };
  mockState.auth.user = {
    name: "Alice Customer",
    email: "alice@example.com",
  };
  mockState.runtimeRef.current = null;

  vi.stubGlobal("window", globalThis);
  vi.stubGlobal("FormData", MockFormData);
  vi.stubGlobal("URL", {
    createObjectURL: vi.fn(() => "blob:payment-proof-preview"),
    revokeObjectURL: vi.fn(),
  });

  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

function haveDepsChanged(
  previousDeps?: readonly unknown[],
  nextDeps?: readonly unknown[],
) {
  if (!previousDeps || !nextDeps) {
    return true;
  }

  if (previousDeps.length !== nextDeps.length) {
    return true;
  }

  return nextDeps.some((dependency, index) => {
    return !Object.is(dependency, previousDeps[index]);
  });
}

async function renderAndSettle(
  component: () => ReactElement,
  runtime: HookRuntime,
) {
  let attempts = 0;
  let tree: ResolvedNode = null;

  while (attempts < 30) {
    runtime.needsRerender = false;
    tree = resolveNode(runtime.render(component));
    runtime.flushEffects();
    await flushMicrotasks();

    if (!runtime.needsRerender && !runtime.hasScheduledEffects()) {
      return tree;
    }

    attempts += 1;
  }

  throw new Error("Component did not settle after repeated renders.");
}

async function flushMicrotasks() {
  for (let index = 0; index < 5; index += 1) {
    await Promise.resolve();
  }
}

function resolveNode(node: ReactNode | ResolvedNode): ResolvedNode {
  if (node == null || typeof node === "boolean") {
    return null;
  }

  if (typeof node === "string" || typeof node === "number") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((child) => resolveNode(child));
  }

  if (!isValidElement(node)) {
    return null;
  }

  const element = node as ReactElement<Record<string, unknown>>;
  const props = element.props;

  if (element.type === Fragment) {
    return resolveNode(props.children as ReactNode);
  }

  if (isClassComponent(element.type)) {
    const instance = new element.type(props);
    return resolveNode(instance.render());
  }

  if (isFunctionComponent(element.type)) {
    return resolveNode(element.type(props));
  }

  const children = Children.toArray(props.children as ReactNode).map((child) =>
    resolveNode(child),
  );

  return {
    type: String(element.type),
    props: {
      ...props,
      children,
    },
  };
}

function isClassComponent(type: unknown): type is ClassComponentLike {
  if (typeof type !== "function") {
    return false;
  }

  return Boolean(
    (type as { prototype?: { isReactComponent?: unknown } }).prototype
      ?.isReactComponent,
  );
}

function isFunctionComponent(
  type: unknown,
): type is (props: Record<string, unknown>) => ReactNode {
  return typeof type === "function" && !isClassComponent(type);
}

function findElement(
  node: ResolvedNode,
  predicate: (element: ResolvedElement) => boolean,
): ResolvedElement {
  const foundElement = findElementOrNull(node, predicate);

  if (!foundElement) {
    throw new Error("Expected element was not found.");
  }

  return foundElement;
}

function findElementOrNull(
  node: ResolvedNode,
  predicate: (element: ResolvedElement) => boolean,
): ResolvedElement | null {
  if (node == null || typeof node === "string" || typeof node === "number") {
    return null;
  }

  if (Array.isArray(node)) {
    for (const child of node) {
      const foundChild = findElementOrNull(child, predicate);

      if (foundChild) {
        return foundChild;
      }
    }

    return null;
  }

  if (predicate(node)) {
    return node;
  }

  return findElementOrNull(node.props.children, predicate);
}

function readNodeText(node: ResolvedNode): string {
  if (node == null) {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => readNodeText(child)).join(" ");
  }

  return readNodeText(node.props.children);
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function createEventDetail(overrides: Partial<EventDetail> = {}): EventDetail {
  return {
    id: 12,
    title: "Future of Payments Summit",
    category: "Technology",
    image: "https://cdn.example.com/event-banner.png",
    eventDateStart: "2099-04-10T09:00:00.000Z",
    eventDateEnd: "2099-04-10T11:00:00.000Z",
    venue: [
      {
        id: 1,
        name: "Jakarta Convention Center",
        city: "Jakarta",
        region: "DKI Jakarta",
        country: "Indonesia",
      },
    ],
    eventImage: [
      {
        id: 1,
        imageURL: "https://cdn.example.com/event-image.png",
      },
    ],
    ticket: [
      {
        id: 1,
        name: "Regular",
        price: 100000,
        quota: 50,
        status: "ACTIVE",
        description: "General admission ticket",
      },
      {
        id: 2,
        name: "VIP",
        price: 200000,
        quota: 5,
        status: "ACTIVE",
        description: "Priority seating and lounge access",
      },
      {
        id: 3,
        name: "Sold Out",
        price: 300000,
        quota: 0,
        status: "SOLD_OUT",
        description: "Unavailable tier",
      },
    ],
    ...overrides,
  };
}

function createTransactionRecord(
  overrides: {
    order?: Partial<OrderRecord>;
    transaction?: Partial<TransactionRecord>;
    event?: Partial<OrderEventSnapshot>;
    ticket?: Partial<OrderTicketSnapshot>;
    lastSyncedAt?: string;
  } = {},
): TransactionLifecycleRecord {
  return {
    order: {
      id: 301,
      eventId: 12,
      ticketTypeId: 1,
      quantity: 2,
      unitPrice: 150000,
      subTotalAmount: 300000,
      discountAmount: 50000,
      totalAmount: 250000,
      voucherCode: "PROMO50",
      buyerName: "Alice Customer",
      buyerEmail: "alice@example.com",
      buyerPhone: "+628123456789",
      status: "PENDING",
      createdAt: "2099-04-06T09:00:00.000Z",
      expiresAt: "2099-04-06T12:00:00.000Z",
      ...overrides.order,
    },
    transaction: {
      id: 77,
      orderId: 301,
      paymentMethod: "BANK_TRANSFER",
      paymentProof: null,
      status: "WAITING_FOR_PAYMENT",
      createdAt: "2099-04-06T09:00:00.000Z",
      updatedAt: "2099-04-06T09:00:00.000Z",
      ...overrides.transaction,
    },
    event: {
      id: 12,
      title: "Future of Payments Summit",
      category: "Technology",
      eventDateStart: "2099-04-10T09:00:00.000Z",
      eventDateEnd: "2099-04-10T11:00:00.000Z",
      image: "https://cdn.example.com/event-banner.png",
      locationLabel: "Jakarta Convention Center, Jakarta",
      ...overrides.event,
    },
    ticket: {
      id: 1,
      name: "Regular",
      price: 150000,
      quota: 100,
      status: "ACTIVE",
      description: "General admission ticket",
      ...overrides.ticket,
    },
    lastSyncedAt: overrides.lastSyncedAt ?? "2099-04-06T09:00:00.000Z",
  };
}
