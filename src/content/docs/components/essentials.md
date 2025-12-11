---
title: Essentials
sidebar:
  order: 1
---

## Button

```js
import { Button } from '@/ui/button'

<Button>Lorem</Button>
```

## Input

```js
import { Input } from '@/ui/input'

<Input placeholder="Lorem ipsum..." />
```

## Link

```js
import { Link } from '@/ui/link'

<Link href="/">Lorem ipsum</Link>
```

## Badge

```js
import { Badge } from '@/ui/badge'

<Badge>Lorem</Badge>
```

## Card

```js
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/ui/card'
import { Button } from '@/ui/button'

<Card>
  <CardHeader>
    <CardTitle>Lorem Ipsum</CardTitle>
    <CardDescription>
      Dolor sit amet consectetur adipiscing elit.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Sed do eiusmod tempor incididunt ut labore.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Lorem</Button>
    <Button>Ipsum</Button>
  </CardFooter>
</Card>
```

## Alert

```js
import { Alert, AlertTitle, AlertDescription } from '@/ui/alert'
import { InfoIcon } from 'lucide-react'

<Alert>
  <InfoIcon />
  <AlertTitle>Lorem Ipsum</AlertTitle>
  <AlertDescription>Dolor sit amet consectetur.</AlertDescription>
</Alert>
```

## Checkbox

```js
import { Checkbox } from '@/ui/checkbox'
import { Label } from '@/ui/label'

<div className="flex items-center space-x-2">
  <Checkbox id="lorem" />
  <Label htmlFor="lorem">Lorem ipsum</Label>
</div>
```

## Dialog

```js
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/ui/dialog'
import { Button } from '@/ui/button'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Lorem Ipsum</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Lorem Ipsum</DialogTitle>
      <DialogDescription>
        Dolor sit amet consectetur adipiscing elit.
      </DialogDescription>
    </DialogHeader>
    <p className="py-4">Sed do eiusmod tempor incididunt.</p>
    <DialogFooter>
      <Button variant="outline">Lorem</Button>
      <Button>Ipsum</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Label

```js
import { Label } from '@/ui/label'

<Label>Lorem Ipsum</Label>
```

## Tabs

```js
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/tabs'

<Tabs defaultValue="lorem">
  <TabsList>
    <TabsTrigger value="lorem">Lorem</TabsTrigger>
    <TabsTrigger value="ipsum">Ipsum</TabsTrigger>
    <TabsTrigger value="dolor">Dolor</TabsTrigger>
  </TabsList>
  <TabsContent value="lorem" className="p-4">
    <h3 className="font-medium text-lg">Lorem</h3>
    <p className="mt-2 text-muted-foreground text-sm">
      Consectetur adipiscing elit sed do eiusmod.
    </p>
  </TabsContent>
  <TabsContent value="ipsum" className="p-4">
    <h3 className="font-medium text-lg">Ipsum</h3>
    <p className="mt-2 text-muted-foreground text-sm">
      Tempor incididunt ut labore et dolore magna.
    </p>
  </TabsContent>
  <TabsContent value="dolor" className="p-4">
    <h3 className="font-medium text-lg">Dolor</h3>
    <p className="mt-2 text-muted-foreground text-sm">
      Aliqua ut enim ad minim veniam quis nostrud.
    </p>
  </TabsContent>
</Tabs>
```

## Typography

```js
import { Heading, P, Lead, Large, Small, Muted, Blockquote, InlineCode, List } from '@/ui/typography'

<Heading level={1}>Lorem Ipsum</Heading>
<Lead>Dolor sit amet consectetur adipiscing elit.</Lead>
<P>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</P>
<Large>Lorem ipsum dolor sit?</Large>
<Small>Consectetur adipiscing</Small>
<Muted>Elit sed do eiusmod.</Muted>
<Blockquote>
  "Tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam."
</Blockquote>
<InlineCode>@lorem/ipsum-dolor</InlineCode>
<List>
  <li>Lorem ipsum dolor</li>
  <li>Sit amet consectetur</li>
  <li>Adipiscing elit sed</li>
</List>
```

## Dropdown Menu

```js
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from '@/ui/dropdown-menu'
import { Button } from '@/ui/button'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Lorem Ipsum</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Lorem Ipsum</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Lorem</DropdownMenuItem>
      <DropdownMenuItem>Ipsum</DropdownMenuItem>
      <DropdownMenuItem>Dolor</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      Sit Amet
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Radio Group

```js
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group'
import { Label } from '@/ui/label'

<RadioGroup defaultValue="lorem">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="lorem" id="lorem" />
    <Label htmlFor="lorem">Lorem</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="ipsum" id="ipsum" />
    <Label htmlFor="ipsum">Ipsum</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="dolor" id="dolor" />
    <Label htmlFor="dolor">Dolor</Label>
  </div>
</RadioGroup>
```
