"use client";
import { useGetLocalFromPathname } from "@/lib/hooks/useGetLocaleFromPathname";
import type { profileTranslations } from "../../../../messages/messagesKeys";
import type { GovernorateData } from "@/lib/types/city-governorate";
import { UserProfile } from "@/lib/types/userProfile";
import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Separator,
  Table,
  Tabs,
  Text,
} from "@radix-ui/themes";

const EditAddressForm = dynamic(() => import("./EditAddressForm"));
const AddAddressForm = dynamic(() => import("./AddAddressForm"));
const DeleteAddressButton = dynamic(() => import("./DeleteAddressButton"));

type Props = {
  translations: profileTranslations;
  user: UserProfile;
  governorates: GovernorateData[];
};

const AddressInfo = ({ label, info }: { label: string; info: string }) => {
  return (
    <Flex gap="1">
      <Text color="crimson" as="label" size="4">
        {label}:
      </Text>
      <Text size="3">{info}</Text>
    </Flex>
  );
};

const ProfileTabs = ({ translations, user, governorates }: Props) => {
  const locale = useGetLocalFromPathname();

  return (
    <Tabs.Root defaultValue="orders">
      <Tabs.List>
        <Tabs.Trigger value="orders">
          <Text size="4">{translations.orders}</Text>
        </Tabs.Trigger>
        <Tabs.Trigger value="addresses">
          <Text size="4">{translations.addresses}</Text>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="orders">
        {user.orders && user.orders.length > 0 && (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>
                  {translations.orderno}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {translations.total}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {translations.orderstatus}
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {user.orders.map((order) => (
                <Table.Row key={order.id}>
                  <Table.RowHeaderCell>{order.id}</Table.RowHeaderCell>
                  <Table.Cell>{order.total}</Table.Cell>
                  <Table.Cell>{order.order_status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
        {!user.orders ||
          (user.orders.length === 0 && (
            <Flex justify="center" align="center">
              <Heading as="h3" mt="4">
                Waiting for your fabulous orders
              </Heading>
            </Flex>
          ))}
      </Tabs.Content>

      <Tabs.Content value="addresses">
        {user.addresses && user.addresses.length > 0 && (
          <Flex direction="column" gap="4" mt="2">
            {user.addresses.map((address) => (
              <Box p="0" m="0" key={address.id}>
                <Grid p="4" gap="4" columns={{ initial: "1", md: "2" }} mt="2">
                  <AddressInfo
                    label={translations.firstname}
                    info={address.first_name}
                  />
                  <AddressInfo
                    label={translations.lastname}
                    info={address.last_name}
                  />
                  <AddressInfo
                    label={translations.phone}
                    info={address.phone || ""}
                  />
                  <AddressInfo
                    label={translations.governorate}
                    info={
                      locale === "en"
                        ? address.governorate.governorate_name_en
                        : address.governorate.governorate_name_en
                    }
                  />
                  <AddressInfo
                    label={translations.street}
                    info={address.street}
                  />
                  <AddressInfo
                    label={translations.building}
                    info={address.building || ""}
                  />
                  <AddressInfo
                    label={translations.floor}
                    info={address.floor ? `${address.floor}` : ""}
                  />
                  <AddressInfo
                    label={translations.apartmentno}
                    info={address.apartment_no || ""}
                  />
                  <AddressInfo
                    label={translations.details}
                    info={address.details || ""}
                  />

                  <Flex justify="between">
                    <EditAddressForm
                      governorates={governorates}
                      address={address}
                      translations={translations}
                    />
                    <DeleteAddressButton
                      translations={translations}
                      address={address}
                    />
                  </Flex>
                </Grid>
                <Separator
                  my="4"
                  size="4"
                  color="crimson"
                  orientation="horizontal"
                />
              </Box>
            ))}
          </Flex>
        )}
        {!user.addresses?.length && (
          <Flex
            direction="column"
            justify="center"
            align="center"
            gap="4"
            mt="4"
          >
            <Heading as="h3">you have no addresses saved add Address</Heading>
            <AddAddressForm
              governorates={governorates}
              translations={translations}
            />
          </Flex>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ProfileTabs;
