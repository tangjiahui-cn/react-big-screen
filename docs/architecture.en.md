# Architecture

[简体中文](./architecture.md) | English

Read this document before changing anything under `src/`.

## The three-layer model

The core of this project's architecture is a three-layer model: the **template layer `Component`**, the **data layer `ComponentNode`**, and the **behavior layer `Instance`**. Every feature is an extension built on top of it — the drag system, history records, alignment guides, and so on.

The underlying design principle: separate data from behavior, and avoid coupling.

| Layer | Question it answers | Persisted |
|-----| --- | --- |
| Template layer | **What** this kind of component is | No |
| Data layer | **What this component's configuration is** | Yes |
| Behavior layer | **How** to operate this component at runtime | No |

### Template layer (Component)

The template decides how a component renders. It is the only part of the three-layer model that supports user customization, and its carrier is a component.

### Data layer (ComponentNode)

Data is the editor's persistable state, and the single source of truth. It originates in two ways: automatically at editor runtime (creating a component, copying a component, and so on), or by parsing imported JSON during initialization.

The data layer is only stored permanently on an explicit export; at runtime it lives in memory.

### Behavior layer (Instance)

The behavior layer's main manifestation is the **behavior instance `Instance`**. An `Instance` is the runtime behavior handle of a component, used to control a specific behavior of a specific component at runtime. It registers itself automatically when the component mounts and unregisters when it unmounts. `Instance` only provides runtime operation capabilities: it carries no business state that needs persisting, and it keeps no mirrored copy of `ComponentNode`. A common use case is controlling whether a component is selected or deselected.

### On the design

#### 1. Why split data from behavior instances?

The two have different responsibilities and lifecycles: `ComponentNode` exists independently of whether a component is rendered, and must support serialization, history records, and import/export; `Instance` comes into being when a component mounts and is destroyed with it, and takes no part in persistence.

Splitting them keeps the data layer a pure data structure, with runtime capabilities provided through the instance layer. That prevents non-serializable objects — DOM nodes, React refs, methods — from leaking into editor state, and keeps state management, history records, and data persistence consistent.

## Component system

In this editor a component is not a React component but a hot-pluggable asset, and each component uses its `cId` as its unique identifier. Users can define and register components without modifying the editor architecture.

### Component contract

It has three parts: renderer + property panel + event contract. The renderer renders the data layer into the editor, the property panel modifies the data layer, and the event contract declares the event relations between components.

### Triggering renders

The component list should be fully registered before the page renders, since it is the renderer of the data layer. Registering a single component triggers a re-render of the entire page, so batch registration is recommended.

## Event system

The event system mainly solves zero-coupling linkage between components. It consists of three parts: the event channel, the event contract, and the event relation.

### Event channel

Handles event transport and data processing. It reuses the editor's built-in pub/sub manager, generating `useExpose` and `handleTrigger` via `useCreateUseExposeHook` and `useCreateHandleTrigger`. These expose a component's internal events and trigger external events at runtime, hiding the underlying data-processing details.

### Event contract

It mainly decouples two pairs — component from component, and component from editor — and supports persistence.

- Component from component: dependency inversion. When A operates on B, A does not import B and need not know B's type, and B holds no reference to A. A holds only the target id and the contract id, never the target itself. If B is mounted it responds; if it is not mounted, nothing is done.
- Component from editor: the editor depends on contracts, not on implementations. The configuration UI is generated entirely from `triggers` / `exposes`, with no hardcoded list of components. Add a new component and the panel automatically offers its options.
- Persistence: an event chain is an ordinary field on the source component's `ComponentNode`, kept in pure data form (custom functions are stored as strings and restored at runtime).

A component declares its interface explicitly: `triggers` (what happened inside) and `exposes` (the internal events it exposes).

### Event relation

Stores the linkage relations between events. They are kept in pure data form inside the source component's `componentNode` and imported/exported along with it, with no binding to the runtime. A relation is owned by the initiator; the target component holds no reference to it.
